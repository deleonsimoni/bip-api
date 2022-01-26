import {GenericService} from "../generics/generic.service";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {TimeSheet, TimeSheetDocument} from "../schemas/timesheet";


export class TimeSheetService extends GenericService<TimeSheetDocument> {

    constructor(
        @InjectModel(TimeSheet.name) private readonly modelTimeSheet: Model<TimeSheetDocument>
  
    ) {
        super(modelTimeSheet);
    }

    async findById(id: string) {
        return this.modelTimeSheet.findById(id).exec();
    }


    async findByIdDate(id, date): Promise<TimeSheet[]> {
  
        let retorno: any = {};
        let exit = "";

        retorno.timesheet = await this.modelTimeSheet.find({'$and': [{employee: id},{date: date},{exit: exit}]})
        .select('_id date month year entry exit journey note employee')
        .exec().catch(reason => reason);
        console.info("retorno.timesheet "+retorno.timesheet);
        return retorno.timesheet;
    }

    async findByIdMonthYear(id, vmonth, vyear): Promise<TimeSheet[]> {
  
        let retorno: any = {};
        let exit = "";

        retorno.timesheet = await this.modelTimeSheet.find({'$and': [{employee: id},{month: vmonth},{year: vyear}]})
        .select('_id date month year entry exit journey note employee')
        .exec().catch(reason => reason);
        console.info("retorno.timesheet "+retorno.timesheet);
        return retorno.timesheet;
    }


    async findByIdDateCount(id, date): Promise<TimeSheet[]> {
      return this.modelTimeSheet.count({'$and': [{employee: id},{date: date}]}).exec().catch(reason => reason);
    }


    async findAllByOwner(userId): Promise<TimeSheetDocument[]> {
        return this.modelTimeSheet.find({owner: userId}).exec().catch(reason => reason);
    }
    async countByOwner(userId): Promise<number> {
        return this.modelTimeSheet.count({owner: userId}).exec().catch(reason => reason);
    }
}
