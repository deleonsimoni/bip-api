import {Injectable} from '@nestjs/common';
import {Document, Model} from 'mongoose';

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

    async findOne(id: string) {
        return this.model.findById(id).exec();
    }

    async findAll(): Promise<T[]> {
        return this.model.find().exec().catch(reason => reason);
    }

    async create(obj: any): Promise<T> {
        const created = new this.model(obj);
        return created.save().catch(reason => reason);
    }

    async update(id: string, obj: any): Promise<T> {
        return this.model.findByIdAndUpdate(id, obj).exec().catch(reason => reason);
    }

    async delete(id: string) {
        const obj = this.model.findByIdAndDelete(id).exec();
        return (await obj).remove().catch(reason => reason);
    }
}