import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Company, CompanyDocument} from "../schemas/company";
import {GenericService} from "../generics/generic.service";

@Injectable()
export class CompanyService extends GenericService<CompanyDocument> {

    constructor(
        @InjectModel(Company.name) private readonly modelCompany: Model<CompanyDocument>
    ) {
        super(modelCompany);
    }
}
