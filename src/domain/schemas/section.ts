import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";
import {Inventory} from "./inventory";

export type SectionDocument = Section & Document;

@Schema()
export class Section {


    @Prop({require: true})
    name: String;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: "Inventory"})
    inventory: Inventory;

}


export const SectionSchema = SchemaFactory.createForClass(Section);
