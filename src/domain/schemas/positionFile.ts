import {Prop, Schema} from "@nestjs/mongoose";

@Schema()
export class PositionFile {
    @Prop({trim: true})
    refer: String;
    @Prop()
    referPrev: String;
    @Prop()
    description: String;
    @Prop()
    price: String;
    @Prop()
    situation: String;
    @Prop()
    section: String;
}
