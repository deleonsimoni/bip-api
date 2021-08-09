import { Connection } from 'mongoose';
import {BipSchema} from "../schemas/bip";

export const BipProvider = [
    {
        provide: 'BIP_MODEL',
        useFactory: (connection: Connection) => connection.model('Bip', BipSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];