import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Client, ClientSchema} from "../schemas/client";
import {Inventory, InventorySchema} from "../schemas/inventory";

@Module({
  imports: [MongooseModule.forFeature([{ name: Inventory.name, schema: InventorySchema }])],
  exports: [InventoryService],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
