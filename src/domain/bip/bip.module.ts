import {Module} from '@nestjs/common';
import {BipService} from './bip.service';
import {BipController} from './bip.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Bip, BipSchema} from "../schemas/bip";

@Module({
  imports: [MongooseModule.forFeature([{ name: Bip.name, schema: BipSchema }])],
  controllers: [BipController],
  providers: [BipService]
})
export class BipModule {}
