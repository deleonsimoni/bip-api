import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {GenericService} from "../generics/generic.service";
import {Bip, BipDocument} from "../schemas/bip";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import { BipDTO } from './dto/bip.dto';

@Injectable()
export class BipService extends GenericService<BipDocument>{
    constructor(
        @InjectModel(Bip.name) private readonly modelBip: Model<BipDocument>
    ) {
        super(modelBip);
    }

    async syncronize(bipDTO, idUser) {

        bipDTO.employee = idUser;
        
      /*  let existSection = await this.modelBip.find({'$and': [
          {inventory: bipDTO.inventory},
          {section: bipDTO.section}
        ]})
        .exec().catch(reason => reason);

        if(existSection.length > 0){
            await this.modelBip.findOneAndUpdate({_id: existSection._id}, bipDTO);

        } else {*/
            await this.modelBip.create(bipDTO).catch(reason => {
                throw new HttpException(reason, HttpStatus.BAD_REQUEST);
            });
        //}

    }
}
