import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {User} from "./user";
import * as mongoose from "mongoose";
import {Company} from "./company";
import {Phones} from "./phones";
import {Address} from "./address";

export type ClientDocument = Client & Document;

@Schema()
export class Client {

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: "User"})
    owner: User;

    @Prop({type: Date, default: new Date()})
    createdAt: Date;

    @Prop({required: true, trim: true})
    name: String;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Company"})
    contract: Company;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Client"})
    headquarters: Client;

    @Prop({required: true, trim: true, lowercase: true})
    email: String;

    @Prop({trim: true})
    document: String;

    @Prop()
    phones: Phones;

    @Prop()
    address: Address;



}

export const ClientSchema = SchemaFactory.createForClass(Client);
