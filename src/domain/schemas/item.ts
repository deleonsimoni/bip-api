import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {Inventory} from "./inventory";

export type ItemDocument = Item & Document;

@Schema()
export class Item {


    @Prop({type: Date, default: new Date()})
    createdAt: Date;

    @Prop({required: true})
    barcode: String;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: "Inventory"})
    employee: Inventory;

    @Prop({required: true})
    name: String;


}


export const ItemSchema = SchemaFactory.createForClass(Item).plugin(require('mongoose-unique-validator'));