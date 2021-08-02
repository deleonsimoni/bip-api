import { Connection } from 'mongoose';
import {BipSchema} from "../schemas/Bip";

export const BipProvider = [
    {
        provide: 'BIP_MODEL',
        useFactory: (connection: Connection) => connection.model('Bip', BipSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];