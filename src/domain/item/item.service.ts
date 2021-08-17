import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {GenericService} from "../generics/generic.service";
import {Item, ItemDocument} from "../schemas/item";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import * as ReadLine from "readline";
import {Stream} from "stream";
import {PositionFile} from "../schemas/positionFile";
import * as stream from "stream";
import {create} from "domain";
import {Inventory} from "../schemas/inventory";
import * as Http from "http";

@Injectable()
export class ItemService extends GenericService<ItemDocument> {
    constructor(
        @InjectModel(Item.name) private readonly modelItem: Model<ItemDocument>
    ) {
        super(modelItem);
    }

    async loadItensFromFile(filestr: Buffer, obj: Inventory, idInventory) {
        await this.deleteByInventory(idInventory);
        const readline = require('readline');
        var bufferStream = new stream.PassThrough();
        bufferStream.end(filestr);
        let itens = [];
        const readInterface = readline.createInterface({
            input: bufferStream
        });

        for await (const line of readInterface) {
        // readInterface.on('line', function (line,) {
            let item: Item = new Item();
            item.inventory = idInventory;
            if (obj.positionFile.refer) {
                const pos: string[] = obj.positionFile.refer.split('-');
                item.refer = line.substr(Number(pos[0]), Number(pos[1]));
            }
            if (obj.positionFile.referPrev) {
                const pos: string[] = obj.positionFile.referPrev.split('-');
                item.referPrev = line.substr(Number(pos[0]), Number(pos[1]));
            }
            if (obj.positionFile.price) {
                const pos: string[] = obj.positionFile.price.split('-');
                item.price = line.substr(Number(pos[0]), Number(pos[1]));
            }
            if (obj.positionFile.description) {
                const pos: string[] = obj.positionFile.description.split('-');
                item.description = line.substr(Number(pos[0]), Number(pos[1]));
            }
            if (obj.positionFile.situation) {
                const pos: string[] = obj.positionFile.situation.split('-');
                item.situation = line.substr(Number(pos[0]), Number(pos[1]));
            }
            if (obj.positionFile.section) {
                const pos: string[] = obj.positionFile.section.split('-');
                item.section = line.substr(Number(pos[0]), Number(pos[1]));
            }

            this.createItem(item).catch(reason => {
                throw new HttpException(reason, HttpStatus.BAD_REQUEST)
            });

        };
        itens.forEach(i => {
            console.log(i);
        });

    }

    async getItemByInventoryId(inventoryId) {
        return this.modelItem.find({inventory: inventoryId}).exec().catch(reason => reason);
    }

    async createItem(input: Item) {
        return super.create(input).catch(reason => {
            throw new HttpException(reason, HttpStatus.BAD_REQUEST)
        });
    }

    async deleteByInventory(id: string) {
        return  this.modelItem.deleteMany().exec().catch(reason => reason);
    }
}
