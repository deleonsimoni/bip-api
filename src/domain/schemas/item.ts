import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from 'mongoose';

export type ItemDocument = Item & Document;

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
    
    @Prop()
    bip: [{
        section: {type:String},
        quantity: {type:String},
        device: {type:String}
    }]
}
export const ItemSchema = SchemaFactory.createForClass(Item);
