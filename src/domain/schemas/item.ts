import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {Inventory} from "./inventory";

export type ItemDocument = Item & Document;

@Schema()
export class Item {


    @Prop({type: Date, default: new Date()})
    createdAt: Date;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: "Inventory"})
    inventory: Inventory;

    @Prop({trim: true})
    refer: String;
    @Prop({trim: true})
    referPrev: String;
    @Prop({trim: true})
    description: String;
    @Prop({trim: true})
    price: String;
    @Prop({trim: true})
    situation: String;
    @Prop({trim: true})
    section: String;


}


export const ItemSchema = SchemaFactory.createForClass(Item).plugin(require('mongoose-unique-validator'));
