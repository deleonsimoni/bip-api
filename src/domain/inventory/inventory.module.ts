import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Client, ClientSchema} from "../schemas/client";
import {Inventory, InventorySchema} from "../schemas/inventory";
import {FileService} from "../file/file.service";
import {ConfigModule} from "@nestjs/config";
import {FileModule} from "../file/file.module";
import {ItemModule} from "../item/item.module";
import { ItemList, ItemListSchema } from '../schemas/itemList';
import * as moment from 'moment-timezone';
import { UtilService } from '../util/util.service';
import { Bip, BipSchema } from '../schemas/bip';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Inventory.name, schema: InventorySchema },
    { name: Bip.name, schema: BipSchema },
     { name: ItemList.name, schema: ItemListSchema }]),
    
      FileModule,
      ConfigModule,
      ItemModule],
  exports: [InventoryService],
  controllers: [InventoryController],
  providers: [InventoryService, UtilService,
    {
      provide: 'MomentWrapper',
      useValue: moment
    },
  ]
})
export class InventoryModule {}
