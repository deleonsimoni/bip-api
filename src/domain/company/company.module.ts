import {Module} from '@nestjs/common';
import {CompanyService} from './company.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Company, CompanySchema} from "../schemas/company";

@Module({
  imports: [MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }])],
  providers: [CompanyService],
  exports: [CompanyService]
})
export class CompanyModule {}
