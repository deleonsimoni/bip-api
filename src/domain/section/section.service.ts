import {Injectable} from '@nestjs/common';
import {GenericService} from "../generics/generic.service";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Section, SectionDocument} from "../schemas/section";

@Injectable()
export class SectionService extends GenericService<SectionDocument> {
    constructor(
        @InjectModel(Section.name) private readonly modelSection: Model<SectionDocument>
    ) {
        super(modelSection);
    }
}
