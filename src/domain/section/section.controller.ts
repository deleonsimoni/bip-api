import {Controller} from '@nestjs/common';
import {SectionService} from './section.service';
import {GenericController} from "../generics/generic.controller";
import {SectionDocument} from "../schemas/section";

@Controller('section')
export class SectionController extends GenericController<SectionDocument> {
    constructor(private readonly sectionService: SectionService) {
        super(sectionService);
    }
}
