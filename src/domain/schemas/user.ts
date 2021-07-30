import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    id: number;

    @Prop()
    password: string;

    @Prop()
    username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);