import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import {UserModule} from "../user/user.module";
import {ClientModule} from "../client/client.module";
import {InventoryModule} from "../inventory/inventory.module";
import { TimeSheetModule } from '../timesheet/timesheet.module';


@Module({
  imports: [UserModule, ClientModule, InventoryModule, TimeSheetModule],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
