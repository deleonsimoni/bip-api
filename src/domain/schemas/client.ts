import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {User} from "./user";
import * as mongoose from "mongoose";
import {Company} from "./company";

export type ClientDocument = Client & Document;

@Schema()
export class Client {

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: "User"})
    owner: User;

    @Prop({type: Date, default: new Date()})
    createdAt: Date;

    @Prop({required: true, trim: true})
    name: String;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: "Company"})
    contract: Company;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Client"})
    headquarters: Client;

    @Prop({required: true, trim: true, lowercase: true})
    email: String;


    @Prop({trim: true})
    cpfcnpj: String;
    @Prop({trim: true})
    mainphone: String;
    @Prop({trim: true})
    secondphone: String;


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

export const ClientSchema = SchemaFactory.createForClass(Client);