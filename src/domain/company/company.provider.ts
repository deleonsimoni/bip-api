import {Connection} from 'mongoose';
import {CompanySchema} from "../schemas/company";

export const CompanyProvider = [
    {
        provide: 'COMPANY_MODEL',
        useFactory: (connection: Connection) => connection.model('Company', CompanySchema),
        inject: ['DATABASE_CONNECTION'],
    },
];