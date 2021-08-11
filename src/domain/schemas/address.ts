import {Prop, Schema} from "@nestjs/mongoose";

@Schema()
export class Address {
    @Prop({trim: true})
    street: String;

    @Prop({trim: true})
    number: number;

    @Prop({trim: true})
    complement: String;

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