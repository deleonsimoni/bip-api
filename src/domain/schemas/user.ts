import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({require: true})
    password: string;

    @Prop({require: true, lowercase: true})
    email: string;

    @Prop({type: Date, default: new Date()})
    createdAt: Date;

    @Prop({require: true})
    name: String;

}


export const UserSchema = SchemaFactory.createForClass(User);