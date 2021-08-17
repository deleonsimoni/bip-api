import {Body, Controller, Delete, Get, Param, Post, Put, Request, UploadedFile, UseInterceptors} from '@nestjs/common';
import {InventoryService} from './inventory.service';
import {Inventory} from "../schemas/inventory";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiBearerAuth} from "@nestjs/swagger";


@ApiBearerAuth()
@Controller('inventory')
export class InventoryController  {
    constructor(private readonly service: InventoryService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@Body() body,@Request() req, @UploadedFile() file: Express.Multer.File) {
        const object = JSON.parse(body.formulario);
        return this.service.create(object, file, req);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(@Param('id') id: string, @Body() obj: any, @Request() req, @UploadedFile() file: Express.Multer.File) {
        const object = JSON.parse(obj.data);

        return this.service.update(id, object, file, req);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }

    @Get()
    findAll(@Request() req) {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req): Promise<Inventory> {
        return this.service.findOne(id);
    }

}
