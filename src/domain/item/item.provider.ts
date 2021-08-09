import { Connection } from 'mongoose';
import {ItemSchema} from "../schemas/item";

export const ItemProvider = [
    {
        provide: 'ITEM_MODEL',
        useFactory: (connection: Connection) => connection.model('Item', ItemSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];