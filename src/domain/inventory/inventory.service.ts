import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, Mongoose} from "mongoose";
import {Inventory, InventoryDocument} from "../schemas/inventory";
import {FileService} from "../file/file.service";
import {ItemService} from "../item/item.service";
import { ItemList, ItemListDocument } from '../schemas/itemList';
import { Client, ClientDocument} from '../schemas/client';
import { UtilService } from '../util/util.service';
import { Bip, BipDocument } from '../schemas/bip';
var mongoose = require('mongoose');

@Injectable()
export class InventoryService {

    constructor(
        @InjectModel(Inventory.name) private readonly model: Model<InventoryDocument>,
        @InjectModel(ItemList.name) private readonly itemModel: Model<ItemListDocument>,
        @InjectModel(Bip.name) private readonly bipModel: Model<BipDocument>,
        @InjectModel(Client.name) private readonly clientModel: Model<ClientDocument>,

        private utilService: UtilService,


        private fileservice: FileService,
        private itemService: ItemService
    ) {
    }


    async findOne(id: string) {
        return this.model.findById(id).exec();
    }

    async comboSelect(owner) {
        return this.model.find({owner: owner}).select('client startDate endDate').populate({path: 'client'}).exec().catch(reason => reason);
    }

    async getInventaryExcel(idInventary) {
        return this.model.findById(idInventary).select('client startDate endDate summary owner description employees').populate({path: 'client employees owner'}).exec().catch(reason => reason);
    }

    
    async getEmployeeById(idEmployee){
        console.log('Employee information one '+idEmployee);
        let retorno: any = {};
        retorno.employee = await this.model.countDocuments({employees: idEmployee})
                               .exec().catch(reason => reason);
                               
        return retorno.employee;
     }

    async getCompanyById(idClient){
        //let retorno: any = {};
        //retorno.client = await this.clientModel.find({headquarters: idClient})
        //.select('headquarters')
        //.exec().catch(reason => reason);
        console.log('Client information one '+idClient);
        let retorno: any = {};
        retorno.client = await this.clientModel.countDocuments({headquarters: idClient})
                               .exec().catch(reason => reason);
        if (retorno.client == 0) {
            //Enter this IF when it does not find headquarters.
            console.log('Client information three '+retorno.client);
            retorno.client = await this.model.countDocuments({client: idClient})
            .exec().catch(reason => reason);
            console.log('Client information three 1 '+retorno.client);
            return retorno.client;
            //return this.model.find({client: idClient})
            //.select('client')
            //.populate('client', '-phones -address -headquarters')
            //.exec().catch(reason => reason);
        }
        else {
            //Enter this else when it find headquarters.
            console.log('Client information four '+retorno.client);
            return retorno.client;
        }
    }


    async getInventoryUser(idUser) {
        
        const today = this.utilService.getActualDate();
        return this.model.find({'$and': [{startDate: {
            $lte: today
          }},{endDate: {
            $gte: today
          }},
          {employees: idUser}
        ]})
        
        .select('startDate endDate client isQuantify')
        .populate('client', '-phones -address -headquarters')
        .exec().catch(reason => reason);
    }

    async findAll(id): Promise<Inventory[]> {
        return this.model.find({owner: id})
        .select('startDate endDate client isQuantify')
        .populate('client', '-phones -address -headquarters')
        .exec().catch(reason => reason);
    }

    async detailInventory(idUser, idInventory): Promise<any> {
        let retorno: any = {};
        retorno.inventory = await this.model.find({'$and': [{_id: idInventory},{owner: idUser}]})
        .select('startDate endDate client isQuantify description createdAt employees')
        .populate('client', '-headquarters')
        .populate('employees')
        .exec().catch(reason => reason);

        //contabilizando total arquivo cliente
        var totals = await this.itemModel.aggregate([
            {$match: { 'inventory': mongoose.Types.ObjectId(idInventory) } },
            {$project: {count: {$size: '$itens'}}}
        ])
        retorno.totalClient = totals[0].count

        //contabilizando total bipado
        totals = await this.bipModel.aggregate([
        {$match: { 'inventory': mongoose.Types.ObjectId(idInventory) } },
        {$project: {count: {$size: '$bip'}}},
        ])

        retorno.totalBip = totals.reduce((sum, li) => sum + li.count, 0)
        return retorno;
    }

    async getSecoes(idUser, idInventory): Promise<any> {

        let totals = await this.bipModel.aggregate([
            {$match: { 'inventory': mongoose.Types.ObjectId(idInventory) } },
            {$project: {'section': '$section',count: {$size: '$bip'}}},
         ]);

        return totals;
    }

    async getItensInventoryUser(idInventory) {
        return this.itemModel.find({inventory: idInventory})
        .exec().catch(reason => reason);
    }
      
    async exportFile(idInventory, idFormato) {
        let totals = await this.bipModel.aggregate([
            {$match: { 'inventory': mongoose.Types.ObjectId(idInventory) } },
            {$project: {'bips': '$bip'}},
         ]);
         if(totals){
            totals = [].concat.apply([], totals.map(tot =>tot.bips));
         }

        return totals;

    }

    async getItensPaginated(idInventary, page, size) {
        return this.model.findById(idInventary, { itensClient : {
            $slice: [-page * size, size]
        }})
        .select('-limbo -owner -employees -client -summary -description -startDate -endDate')
        .exec().catch(reason => reason);
    }

    async getLimboPaginated(idInventary, page, size) {
        return this.model.findById(idInventary, { limbo : {
            $slice: [-page * size, size]
        }})
        .select('-itensClient -owner -employees -client -summary -description -startDate -endDate')
        .exec().catch(reason => reason);    
    }

    async getLimboFull(idInventary) {
        return this.model.findById(idInventary)
        .select('limbo')
        .exec().catch(reason => reason);    
    }

    async getItensFull(idInventary) {
        return this.model.findById(idInventary)
        .select('itensClient')
        .exec().catch(reason => reason);    
    }
    


    async createInventoryExcel(obj: any, userId: any): Promise<Inventory> {

        let persisted;
        obj.owner = userId;

        try {
            
            obj.limbo = [];

            let summary = {
                totalClient: 0,
                totalBip: 0,
                totalFind: 0,
                totalLimbo: 0
            };

            for (var clientIndex = 0; clientIndex < obj.itensClient.length; clientIndex++) {

                if(obj.itensClient[clientIndex].refer == null){
                    continue;
                }
                summary.totalClient += Number(obj.itensClient[clientIndex].quantity);

                for (var bipIndex = 0; bipIndex < obj.itensBip.length; bipIndex++) {

                    if(obj.itensClient[clientIndex].refer == obj.itensBip[bipIndex].refer){

                        if(obj.itensClient[clientIndex].bip){
                            obj.itensClient[clientIndex].bip.push({
                                section: obj.itensBip[bipIndex].section || null,
                                quantity: obj.itensBip[bipIndex].quantity,
                                device: obj.itensBip[bipIndex].device || null
                            });
                        } else {
                            obj.itensClient[clientIndex].bip = [{
                                section: obj.itensBip[bipIndex].section || null,
                                quantity: obj.itensBip[bipIndex].quantity,
                                device: obj.itensBip[bipIndex].device || null
                            }];
                        }

                        summary.totalFind += Number(obj.itensBip[bipIndex].quantity);

                    }
                    

                }

            }


            for (var bipIndex = 0; bipIndex < obj.itensBip.length; bipIndex++) {
                summary.totalBip += Number(obj.itensBip[bipIndex].quantity);
                let find = false;

                for (var clientIndex = 0; clientIndex < obj.itensClient.length; clientIndex++) {
                    if(obj.itensClient[clientIndex].refer == obj.itensBip[bipIndex].refer){
                        find = true;
                        break;
                    }
                }

                if(!find){
                    summary.totalLimbo += Number(obj.itensBip[bipIndex].quantity);
                    obj.limbo.push({
                        refer: obj.itensBip[bipIndex].refer,
                        section: obj.itensBip[bipIndex].section || null,
                        quantity: obj.itensBip[bipIndex].quantity,
                        device: obj.itensBip[bipIndex].device || null
                    });
                }

            }


            obj.summary = summary;

            persisted = await this.model.create(obj).catch(reason => {
                throw new HttpException(reason, HttpStatus.BAD_REQUEST);
            });
            
        } catch (e) {
            console.log(e);
            throw new HttpException("Erro no Servidor " + e, HttpStatus.BAD_REQUEST);
        }

        return persisted;

    }

    async create(obj: Inventory, file: Express.Multer.File, req: any): Promise<Inventory> {

        if (file) {
            let url;
            /*try {

                url = await this.fileservice.uploadFile(file.buffer, this.getFileName(obj, file, req));
            } catch (e) {
                throw new HttpException("Invalid File", HttpStatus.BAD_REQUEST);
            }*/
            obj.url = 'aaaa';
            obj.owner = req.user.id;
            let persisted;
            persisted = await this.model.create(obj).catch(reason => {
                throw new HttpException(reason, HttpStatus.BAD_REQUEST);
            });

            await this.itemService.loadItensFromFile(file.buffer, persisted, persisted._id).catch(reason => {

                this.delete(persisted._id);
                throw new HttpException("Arquivo inválido {" + reason + " }", HttpStatus.BAD_REQUEST);
            });

            return persisted;

        } else {
            throw new HttpException("Invalid File", HttpStatus.BAD_REQUEST);
        }
    }

    getFileName(obj, file, req) {
        let a = `${req.user.id}/clients/${obj.client}/inventario/${this.dataAtualFormatada()}/${file.originalname}`;
        return a;

    }

    dataAtualFormatada() {
        var data = new Date(),
            dia = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0' + dia : dia,
            mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0' + mes : mes,
            anoF = data.getFullYear();
        return diaF + "-" + mesF + "-" + anoF;
    }

    async update(id: string, obj: any, file: Express.Multer.File, req): Promise<Inventory> {
        if (file) {
            let url;
            try {
                await this.fileservice.deletePublicFile(obj.url);
                url = await this.fileservice.uploadFile(file.buffer, this.getFileName(obj, file, req));
            } catch (e) {
                throw new HttpException("Invalid File", HttpStatus.BAD_REQUEST);
            }
            obj.url = url;
            await this.itemService.loadItensFromFile(file.buffer, obj, id);
        }
        return this.model.findByIdAndUpdate(id, obj).exec().catch(reason => {
            throw new HttpException(reason, HttpStatus.BAD_REQUEST)
        });
    }

    async delete(id: string) {
        const obj = await this.model.findByIdAndDelete(id).exec();
        await this.fileservice.deletePublicFile(obj.url);
        await this.itemService.deleteByInventory(id);
        return (await obj).remove().catch(reason => reason);
    }
}
