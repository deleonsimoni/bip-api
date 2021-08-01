import { Controller } from '@nestjs/common';
import {GenericController} from "../generics/generic.controller";
import {Client, ClientDocument} from "../schemas/client";
import {CompanyService} from "../company/company.service";
import {ClientService} from "./client.service";

@Controller('client')
export class ClientController extends GenericController<ClientDocument>{
    constructor(private clientService: ClientService) {
        super(clientService);
    }
}
