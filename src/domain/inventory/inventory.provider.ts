import { Connection } from 'mongoose';
import {InventorySchema} from "../schemas/Inventory";

export const InventoryProvider = [
    {
        provide: 'INVENTORY_MODEL',
        useFactory: (connection: Connection) => connection.model('Inventory', InventorySchema),
        inject: ['DATABASE_CONNECTION'],
    },
];