import {Injectable} from '@nestjs/common';
import {GenericService} from "../generics/generic.service";
import {Bip, BipDocument} from "../schemas/bip";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class BipService extends GenericService<BipDocument>{
    constructor(
        @InjectModel(Bip.name) private readonly modelBip: Model<BipDocument>
    ) {
        super(modelBip);
    }
}
