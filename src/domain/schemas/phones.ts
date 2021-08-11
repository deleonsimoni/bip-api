import {Prop, Schema} from "@nestjs/mongoose";

@Schema()
export class Phones {
    @Prop({trim: true})
    whatsapp: String;

    @Prop({trim: true})
    phone: String;
}