import { Controller } from '@nestjs/common';
import { BipService } from './bip.service';
import {GenericController} from "../generics/generic.controller";
import {BipDocument} from "../schemas/bip";

@Controller('bip')
export class BipController extends GenericController<BipDocument>{
  constructor(private readonly bipService: BipService) {
    super(bipService)
  }
}
