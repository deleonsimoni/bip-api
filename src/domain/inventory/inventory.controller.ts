import {Controller} from '@nestjs/common';
import {InventoryService} from './inventory.service';
import {GenericController} from "../generics/generic.controller";
import {InventoryDocument} from "../schemas/inventory";

@Controller('inventory')
export class InventoryController extends GenericController<InventoryDocument> {
    constructor(private readonly inventoryService: InventoryService) {
        super(inventoryService);
    }

}
