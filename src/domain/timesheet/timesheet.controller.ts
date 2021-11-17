import {Controller, Body, Get, Param, Request} from '@nestjs/common';
import {GenericController} from "../generics/generic.controller";
import {TimeSheetDocument} from "../schemas/timesheet";
import {TimeSheetService} from "./timesheet.service";


@Controller('timesheet')
export class TimeSheetController extends GenericController<TimeSheetDocument>{
    constructor(private timeSheetService: TimeSheetService) {
        super(timeSheetService);
    }


    @Get('iddate')
    getByIdDate(@Request() req) {
         return this.timeSheetService.findByIdDate(req.query.id, req.query.date);

    }

    @Get('iddate/count')
    getByIdDateCount(@Request() req) {
        return this.timeSheetService.findByIdDateCount(req.query.id, req.query.date);

    }

    
    @Get('idmonthyear')
    getByIdMonthYear(@Request() req) {

        return this.timeSheetService.findByIdMonthYear(req.query.id, req.query.month, req.query.year);
    }



}