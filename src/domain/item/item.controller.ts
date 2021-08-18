import {Controller, Get, Param} from '@nestjs/common';
import { ItemService } from './item.service';
import {GenericController} from "../generics/generic.controller";
import {ItemListDocument} from "../schemas/itemList";

@Controller('item')
export class ItemController extends GenericController<ItemListDocument>{
  constructor(private readonly itemService: ItemService) {
    super(itemService);
  }

  @Get('/byInventory/:id')
  findOne(@Param('id') id: string, req): Promise<ItemListDocument> {
    return this.itemService.getItemByInventoryId(id);
  }
}
