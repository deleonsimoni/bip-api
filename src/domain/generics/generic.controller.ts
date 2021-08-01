import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {Document} from "mongoose";
import {GenericService} from "./generic.service";
import {ApiBearerAuth} from "@nestjs/swagger";

@Controller()
@ApiBearerAuth()
export class GenericController<T extends Document> {
    constructor(private service: GenericService<T>) {
    }

    @Post()
    async create(@Body() obj: T) {
        return this.create(obj);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() obj: T) {
        return this.service.update(id, obj);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<T> {
        return this.service.findOne(id);
    }


}
