import {Controller, Get} from '@nestjs/common';
import {Public} from "./auth/skip.auth";

@Controller()
export class AppController {

    @Public()
    @Get('/ping')
    findAll() {
        return 'alive';
    }
}