import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {Client} from "./client";
import {User} from "./user";

export type InventoryDocument = Inventory & Document;

@Schema()
export class Inventory {


    @Prop({require: true})
    name: String;

    @Prop({type: Date, default: new Date()})
    createdAt: Date;

    @Prop({type: Date})
    startDate: Date;

    @Prop({type: Date})
    endDate: Date;

    @Prop({required:true, type: mongoose.Schema.Types.ObjectId, ref: "Client"})
    client: Client;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: "User"})
    employee: User;

}


export const InventorySchema = SchemaFactory.createForClass(Inventory);