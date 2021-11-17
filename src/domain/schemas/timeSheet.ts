import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from "mongoose";

export type TimeSheetDocument = TimeSheet & Document;

@Schema()
export class TimeSheet {


    //@Prop({type: Date, default: new Date()})
    @Prop({trim: true})
    date: String;

    @Prop({trim: true})
    month: String;

    @Prop({trim: true})
    year: String;

    @Prop({trim: true})
    entry: String;

    @Prop({trim: true})
    exit: String;

    @Prop()
    journey: String;

    @Prop()
    note: String;

    @Prop({trim: true})
    employee: String;


}

export const TimeSheetSchema = SchemaFactory.createForClass(TimeSheet);