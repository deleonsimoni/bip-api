import { Body, Controller, Post, Request } from '@nestjs/common';
import { BipService } from './bip.service';
import {GenericController} from "../generics/generic.controller";
import {BipDocument} from "../schemas/bip";
import { BipDTO } from './dto/bip.dto';

@Controller('bip')
export class BipController extends GenericController<BipDocument>{
  constructor(private readonly bipService: BipService) {
    super(bipService)
  }

  @Post('syncronize')
  async login(@Body() bip, @Request() req) {
      return this.bipService.syncronize(bip.bip, req.user.id);
  }

}

