import {Module} from '@nestjs/common';
import {TimeSheetService} from './timesheet.service';
import {MongooseModule} from "@nestjs/mongoose";

import {TimeSheet, TimeSheetSchema} from "../schemas/timesheet";
import { TimeSheetController } from './timesheet.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: TimeSheet.name, schema: TimeSheetSchema }])],
  providers: [TimeSheetService],
  exports: [TimeSheetService],
  controllers: [TimeSheetController]
})
export class TimeSheetModule {}
