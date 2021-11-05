import {Body, Controller, Delete, Get, Param, Post, Put, Request, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {InventoryService} from './inventory.service';
import {Inventory} from "../schemas/inventory";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiBearerAuth} from "@nestjs/swagger";
import { Response } from 'express';


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

    @Get('/inventaryUser')
    getInventary(@Request() req) {
        return this.service.getInventoryUser(req.user.id);
    }

  
    @Get('/inventaryUser/:id/itens')
    getItensInventoryUser(@Request() req) {
        return this.service.getItensInventoryUser(req.params.id);
    }

    @Post('/inventoryExcel')
    async createInventoryExcel(@Body() obj, @Request() req) {
        const object = obj;
        return this.service.createInventoryExcel(object, req.user.id);
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
        return this.service.findAll(req.user.id);
    }

    @Get('detailInventory/:id')
    detailInventory(@Request() req, @Param('id') id: string): Promise<any>  {
        return this.service.detailInventory(req.user.id, id);
    }

    @Get('secoes/:id')
    getSecoes(@Request() req, @Param('id') id: string): Promise<any>  {
        return this.service.getSecoes(req.user.id, id);
    }


    @Get('export/:id/:idFormato')
    exportFile(@Param('id') id: string,@Param('idFormato') idFormato: number){
        return this.service.exportFile(id, idFormato);
    }
    
    @Get(':id')
    findOne(@Param('id') id: string, @Request() req): Promise<Inventory> {
        return this.service.findOne(id);
    }

    @Get('/idEmployee/:id')
    getEmployeeById(@Param('id') id: string, @Request() req) {
        console.log('class InventoryController - method getEmployeeById '+ id);
        return this.service.getEmployeeById(req.params.id);
    }

    @Get('/idCompany/:id')
    getCompanyById(@Param('id') id: string, @Request() req) {
        console.log('class InventoryController - method getCompanyById '+ id);
        return this.service.getCompanyById(req.params.id);
    }


    @Get('/inventoryExcel/getCombo')
    inventoryExcelCombo(@Request() req) {
        return this.service.comboSelect(req.user.id);
    }

    @Get('/inventoryExcel/:id/getInventary')
    inventoryExcelInventary(@Request() req, @Param('id') id: string) {
        return this.service.getInventaryExcel(id);
    }

    @Get('/inventoryExcel/:id/getItensPaginated')
    getItensPaginated(@Request() req, @Param('id') id: string) {
        return this.service.getItensPaginated(id, req.query.page, req.query.size);
    }

    @Get('/inventoryExcel/:id/getLimboPaginated')
    getLimboPaginated(@Request() req, @Param('id') id: string) {
        return this.service.getLimboPaginated(id, req.query.page, req.query.size);
    }

    @Get('/inventoryExcel/:id/getItensFull')
    getItensFull(@Request() req, @Param('id') id: string) {
        return this.service.getItensFull(id);
    }

    @Get('/inventoryExcel/:id/getLimboFull')
    getLimboFull(@Request() req, @Param('id') id: string) {
        return this.service.getLimboFull(id);
    }

}
