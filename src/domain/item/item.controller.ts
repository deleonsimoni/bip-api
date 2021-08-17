import { Controller } from '@nestjs/common';
import { ItemService } from './item.service';
import {GenericController} from "../generics/generic.controller";
import {ItemDocument} from "../schemas/item";

@Controller('item')
export class ItemController extends GenericController<ItemDocument>{
  constructor(private readonly itemService: ItemService) {
    super(itemService);
  }


  findOne(id: string, req): Promise<ItemDocument> {
    return this.itemService.getItemByInventoryId(id);
  }
}
