import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {Document, FilterQuery, Model} from 'mongoose';

@Injectable()
export abstract class GenericService<T extends Document> {
    private readonly modelName: string;

    constructor(private readonly model: Model<T>) {

        for (const modelName of Object.keys(model.collection.conn.models)) {
            if (model.collection.conn.models[modelName] === this.model) {
                this.modelName = modelName;
                break;
            }
        }
    }

    async findOne(
        conditions: Partial<Record<keyof T, unknown>>,
        projection: string | Record<string, unknown> = {},
        options: Record<string, unknown> = {},
    ): Promise<T> {
        try {
            return await this.model.findOne(
                conditions as FilterQuery<T>,
                projection,
                options,
            );
        } catch (err) {
            throw new InternalServerErrorException();
        }


    }

}