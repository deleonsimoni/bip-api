import {Module} from '@nestjs/common';
import {CompanyService} from './company.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Company, CompanySchema} from "../schemas/company";
import {CompanyController} from './company.controller';
import {GenericService} from "../generics/generic.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Company.name, schema: CompanySchema}])],
    providers: [CompanyService],
    exports: [CompanyService],
    controllers: [CompanyController]
})
export class CompanyModule {
}
