import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {Document} from 'mongoose';
import {Section} from "./section";
import {ItemList} from "./itemList";

export type BipDocument = Section & Document;

@Schema()
export class Bip {


    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: "Item"})
    item: ItemList;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: "Section"})
    section: Section;

    @Prop()
    count: number;

}


export const BipSchema = SchemaFactory.createForClass(Bip);
