import {Connection} from 'mongoose';
import {Client, ClientSchema} from "../schemas/client";

export const CompanyProvider = [
    {
        provide: 'CLIENT_MODEL',
        useFactory: (connection: Connection) => connection.model('Client', ClientSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];