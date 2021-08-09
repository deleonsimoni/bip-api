import {Body, Controller, Get, Post, Request} from '@nestjs/common';
import {DashboardService} from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly service: DashboardService) {
    }


    @Get('/clients')
    clientsByMoth(@Request() req) {

        // return this.service.findAll(req.user.id);

    }
}