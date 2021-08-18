import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";
import {Inventory} from "./inventory";
import {Phones} from "./phones";
import {Item} from "./item";

export type ItemListDocument = ItemList & Document;

@Schema()
export class ItemList {


    @Prop({type: Date, default: new Date()})
    createdAt: Date;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: "Inventory"})
    inventory: Inventory;

    @Prop()
    itens: Item[];


}


export const ItemListSchema = SchemaFactory.createForClass(ItemList).plugin(require('mongoose-unique-validator'));
