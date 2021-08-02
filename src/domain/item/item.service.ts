import {Injectable} from '@nestjs/common';
import {GenericService} from "../generics/generic.service";
import {Item, ItemDocument} from "../schemas/item";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class ItemService extends GenericService<ItemDocument> {
    constructor(
        @InjectModel(Item.name) private readonly modelItem: Model<ItemDocument>
    ) {
        super(modelItem);
    }
}
