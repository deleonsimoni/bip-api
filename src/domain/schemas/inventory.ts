import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {Client} from "./client";
import {User} from "./user";
import {PositionFile} from "./positionFile";

export type InventoryDocument = Inventory & Document;

@Schema()
export class Inventory {


    @Prop({require: true})
    description: String;

    @Prop()
    isQuantify: boolean;

    @Prop({type: Date, default: new Date()})
    createdAt: Date;

    @Prop({type: Date})
    startDate: Date;

    @Prop({type: Date})
    endDate: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Client"})
    client: Client;

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: "User"}])
    employees: User[];

    @Prop()
    positionFile: PositionFile;

    @Prop()
    url: String;
}


export const InventorySchema = SchemaFactory.createForClass(Inventory);
