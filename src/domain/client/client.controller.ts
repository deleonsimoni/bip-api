import {Controller, Get, Request} from '@nestjs/common';
import {GenericController} from "../generics/generic.controller";
import {ClientDocument} from "../schemas/client";
import {ClientService} from "./client.service";
import {UserDocument} from "../schemas/user";

@Controller('client')
export class ClientController extends GenericController<ClientDocument>{
    constructor(private clientService: ClientService) {
        super(clientService);
    }

    @Get('/hqs')
    clientsByMoth(@Request() req) {

        return this.clientService.findAllHqs(req.user.id);

    }
    @Get()
    override findAll(@Request() req): Promise<ClientDocument[]> {
        return this.clientService.findAllByOwner(req.user.id);
    }
}