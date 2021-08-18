import {Injectable} from '@nestjs/common';
import {Document, Model} from 'mongoose';
import {HttpException, HttpStatus} from "@nestjs/common";

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
        return this.model.find().exec().catch(reason => {
            throw new HttpException(reason, HttpStatus.BAD_REQUEST)
        });
    }

    async create(obj: any): Promise<T> {
        const created = new this.model(obj);
        return created.save().catch(reason => {
            throw new HttpException(reason, HttpStatus.BAD_REQUEST)
        });
    }

    async update(id: string, obj: any): Promise<T> {
        return this.model.findByIdAndUpdate(id, obj).exec().catch(reason => {
            throw new HttpException(reason, HttpStatus.BAD_REQUEST)
        });
    }

    async delete(id: string) {
        return this.model.findByIdAndDelete(id).exec().catch(reason => {
            throw new HttpException(reason, HttpStatus.BAD_REQUEST)
        });
    }
}
