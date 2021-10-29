import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {Document} from 'mongoose';
import { Inventory } from './inventory';
import {ItemList} from "./itemList";
import { User } from './user';

export type BipDocument = Document;

@Schema()
export class Bip {

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: "User"})
    employee: User;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: "Inventory"})
    inventory: Inventory;

    @Prop()
    section: string;

    @Prop()
    bip: [{
        bip: {type:String},
        quantity: {type:String},
        device: {type:String},
        isFounded: {type:boolean}
    }]
}


export const BipSchema = SchemaFactory.createForClass(Bip);
