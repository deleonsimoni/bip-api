import {Prop, Schema} from "@nestjs/mongoose";

@Schema()
export class Item {

    @Prop({trim: true})
    refer: String;
    @Prop({trim: true})
    referPrev: String;
    @Prop({trim: true})
    description: String;
    @Prop({trim: true})
    price: String;
    @Prop({trim: true})
    situation: String;
    @Prop({trim: true})
    section: String;
}
