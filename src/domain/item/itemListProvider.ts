import { Connection } from 'mongoose';
import {ItemListSchema} from "../schemas/itemList";

export const ItemListProvider = [
    {
        provide: 'ITEM_LIST_MODEL',
        useFactory: (connection: Connection) => connection.model('ItemList', ItemListSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
