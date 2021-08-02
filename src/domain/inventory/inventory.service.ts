import {Injectable} from '@nestjs/common';
import {GenericService} from "../generics/generic.service";
import {Client} from "../schemas/client";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Inventory, InventoryDocument} from "../schemas/inventory";

@Injectable()
export class InventoryService extends GenericService<InventoryDocument> {

  constructor(
      @InjectModel(Inventory.name) private readonly modelInventory: Model<InventoryDocument>
  ) {
    super(modelInventory);
  }
}
