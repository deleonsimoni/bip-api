import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {GenericService} from "../generics/generic.service";
import {Client} from "../schemas/client";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Inventory, InventoryDocument} from "../schemas/inventory";
import {FileService} from "../file/file.service";
import * as Buffer from "buffer";
import {ItemService} from "../item/item.service";
import * as Http from "http";

@Injectable()
export class InventoryService {

    constructor(
        @InjectModel(Inventory.name) private readonly model: Model<InventoryDocument>,
        private fileservice: FileService, private itemService: ItemService
    ) {
    }


    async findOne(id: string) {
        return this.model.findById(id).exec();
    }

    async findAll(): Promise<Inventory[]> {
        return this.model.find().exec().catch(reason => reason);
    }

    async create(obj: Inventory, file: Express.Multer.File, req: any): Promise<Inventory> {

        if (file) {
            let url;
            try {

                url = await this.fileservice.uploadFile(file.buffer, this.getFileName(obj, file, req));
            } catch (e) {
                throw new HttpException("Invalid File", HttpStatus.BAD_REQUEST);
            }
            obj.url = url;
            let persisted;

            persisted = await this.model.create(obj).catch(reason => {
                throw new HttpException(reason, HttpStatus.BAD_REQUEST);
            });

            await this.itemService.loadItensFromFile(file.buffer, persisted, persisted._id).catch(reason => {

                this.delete(persisted._id);
                throw new HttpException("Arquivo inválido {" + reason + " }", HttpStatus.BAD_REQUEST);
            });

            return persisted;

        } else {
            throw new HttpException("Invalid File", HttpStatus.BAD_REQUEST);
        }
    }

    getFileName(obj, file, req) {
        let a = `${req.user.id}/clients/${obj.client}/inventario/${this.dataAtualFormatada()}/${file.originalname}`;
        return a;

    }

    dataAtualFormatada() {
        var data = new Date(),
            dia = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0' + dia : dia,
            mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0' + mes : mes,
            anoF = data.getFullYear();
        return diaF + "-" + mesF + "-" + anoF;
    }

    async update(id: string, obj: any, file: Express.Multer.File, req): Promise<Inventory> {
        if (file) {
            let url;
            try {
                await this.fileservice.deletePublicFile(obj.url);
                url = await this.fileservice.uploadFile(file.buffer, this.getFileName(obj, file, req));
            } catch (e) {
                throw new HttpException("Invalid File", HttpStatus.BAD_REQUEST);
            }
            obj.url = url;
            await this.itemService.loadItensFromFile(file.buffer, obj, id);
        }
        return this.model.findByIdAndUpdate(id, obj).exec().catch(reason => {
            throw new HttpException(reason, HttpStatus.BAD_REQUEST)
        });
    }

    async delete(id: string) {
        const obj = await this.model.findByIdAndDelete(id).exec();
        await this.fileservice.deletePublicFile(obj.url);
        await this.itemService.deleteByInventory(id);
        return (await obj).remove().catch(reason => reason);
    }
}
