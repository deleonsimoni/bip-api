import {Controller} from '@nestjs/common';
import {GenericController} from "../generics/generic.controller";
import {CompanyDocument} from "../schemas/company";
import {CompanyService} from "./company.service";

@Controller('company')
export class CompanyController extends GenericController<CompanyDocument>{
    constructor(private companyService: CompanyService) {
        super(companyService);
    }
}

