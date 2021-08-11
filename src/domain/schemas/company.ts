import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {User} from "./user";
import * as mongoose from "mongoose";
import {Phones} from "./phones";
import {Address} from "./address";

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

    @Prop()
    phones: Phones;

    @Prop()
    address: Address;


}

export const CompanySchema = SchemaFactory.createForClass(Company);