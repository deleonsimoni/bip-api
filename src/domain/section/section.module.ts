import {Module} from '@nestjs/common';
import {SectionService} from './section.service';
import {SectionController} from './section.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Section, SectionSchema} from "../schemas/section";

@Module({
  imports: [MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }])],
  controllers: [SectionController],
  providers: [SectionService]
})
export class SectionModule {}
