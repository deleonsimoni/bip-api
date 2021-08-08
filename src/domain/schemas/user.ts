import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({require: true})
    password: string;

    @Prop({require: true, lowercase: true, unique: true})
    email: string;

    @Prop({type: Date, default: new Date()})
    createdAt: Date;

    @Prop({require: true})
    name: String;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    owner: User;
}


export const UserSchema = SchemaFactory.createForClass(User).plugin(require('mongoose-unique-validator'));