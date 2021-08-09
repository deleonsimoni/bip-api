import { Connection } from 'mongoose';
import {SectionSchema} from "../schemas/section";

export const SectionProvider = [
    {
        provide: 'SECTION_MODEL',
        useFactory: (connection: Connection) => connection.model('Section', SectionSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];