import {Module} from '@nestjs/common';
import {ItemService} from './item.service';
import {ItemController} from './item.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ItemList, ItemListSchema} from "../schemas/itemList";

@Module({
  imports: [MongooseModule.forFeature([{ name: ItemList.name, schema: ItemListSchema }])],
  controllers: [ItemController],
  exports: [ItemService],
  providers: [ItemService]
})
export class ItemModule {}
