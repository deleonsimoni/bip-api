import { Prop, Schema, SchemaFactory,raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {Client} from "./client";
import {User} from "./user";
import {PositionFile} from "./positionFile";
import { Item } from './item';

export type InventoryDocument = Inventory & Document;

@Schema()
export class Inventory {

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: "User"})
    owner: User;
    
    @Prop()
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
    itensClient: [{
        refer: {type:String},
        quantity: {type:String},
        description: {type:String},
        internalCode: {type:String},
        price: {type:String},
        details: {type:String}
        bip: [{
            section: {type:String},
            quantity: {type:String},
            device: {type:String}
        }]
    }];

    @Prop(raw({
        totalClient: {type:Number},
        totalBip: {type:Number},
        totalFind: {type:Number},
        totalLimbo: {type:Number}
    }))
    summary: {};

    @Prop()
    limbo: [{
        refer: {type:String},
        section: {type:String},
        quantity: {type:String},
        device: {type:String}
    }]

    @Prop()
    positionFile: PositionFile;

    @Prop()
    url: String;
}


export const InventorySchema = SchemaFactory.createForClass(Inventory);
