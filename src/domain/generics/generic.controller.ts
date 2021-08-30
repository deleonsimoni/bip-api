import {Body, Controller, Delete, Get, Param, Post, Put, Request} from '@nestjs/common';
import {Document} from "mongoose";
import {GenericService} from "./generic.service";
import {ApiBearerAuth} from "@nestjs/swagger";

@Controller()
@ApiBearerAuth()
export class GenericController<T extends Document> {
    constructor(private service: GenericService<T>) {
    }

    @Post()
    async create(@Body() obj, @Request() req) {
        //TODO remover gambiarra password quando implementar envio de emil
        
        if(!obj.password){
            obj.password = "123456";
        }

        obj.owner = req.user.id;
        return this.service.create(obj);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() obj: T, @Request() req) {
        return this.service.update(id, obj);
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
    findOne(@Param('id') id: string, @Request() req): Promise<T> {
        return this.service.findOne(id);
    }


}
