import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {User} from "./user";
import * as mongoose from "mongoose";

export type CompanyDocument = Company & Document;

@Schema()
export class Company {

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: "User"})
    owner: User;

    @Prop({type: Date, default: new Date()})
    createdAt: Date;

    @Prop({require: true, trim: true})
    name: String;

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: "User"}])
    employees: User[];


    @Prop({trim: true})
    cpfcnpj: String;

    @Prop({trim: true})
    street: String;

    @Prop({trim: true})
    zip: String;

    @Prop({trim: true})
    city: String;

    @Prop({trim: true})
    district: String;

    @Prop({trim: true})
    country: String;

    @Prop({trim: true})
    state: String;


}

export const CompanySchema = SchemaFactory.createForClass(Company);