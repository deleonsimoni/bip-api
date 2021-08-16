import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {GenericService} from "../generics/generic.service";
import {Client} from "../schemas/client";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Inventory, InventoryDocument} from "../schemas/inventory";
import {FileService} from "../file/file.service";
import * as Buffer from "buffer";
import {ItemService} from "../item/item.service";

@Injectable()
export class InventoryService  {

  constructor(
      @InjectModel(Inventory.name) private readonly model: Model<InventoryDocument>,
      private fileservice: FileService, private itemService: ItemService
  ) {
  }


  async findOne(id: string) {
    return this.model.findById(id).exec();
  }

  async findAll(): Promise<Inventory[]> {
    return this.model.find().exec().catch(reason => reason);
  }

  async create(obj: Inventory, file: Express.Multer.File): Promise<Inventory> {
    if(file){
      let url;
      try {

        url = await this.fileservice.uploadFile(file.buffer, this.getFileName(obj));
      } catch (e){
        throw new HttpException("Invalid File", HttpStatus.BAD_REQUEST);
      }
    obj.url = url;

    const created = new this.model(obj);
      let persisted;
      persisted = await created.save().catch(reason => reason);

      await this.itemService.loadItensFromFyle(file.buffer, persisted, persisted._id);
      return persisted;
    }else{
      throw new HttpException("Invalid File", HttpStatus.BAD_REQUEST);
    }
  }

  getFileName(obj) {
    return obj.client + "-" + new Date().toString() + ".txt";

  }
  async update(id: string, obj: any, file: Express.Multer.File): Promise<Inventory> {
    if( file){
      let url;
      try {

        url = await this.fileservice.uploadFile(file.buffer, this.getFileName(obj));
      } catch (e){
        throw new HttpException("Invalid File", HttpStatus.BAD_REQUEST);
      }
      obj.url = url;
      await this.itemService.loadItensFromFyle(file.buffer, obj, id);
    }
    return this.model.findByIdAndUpdate(id, obj).exec().catch(reason => {
      throw new HttpException(reason, HttpStatus.BAD_REQUEST)
    });
  }

  async delete(id: string) {
    await this.itemService.deleteByInventory(id);
    const obj = this.model.findByIdAndDelete(id).exec();
    return (await obj).remove().catch(reason => reason);
  }
}
