import {GenericService} from "../generics/generic.service";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Client, ClientDocument} from "../schemas/client";

export class ClientService extends GenericService<ClientDocument> {

    constructor(
        @InjectModel(Client.name) private readonly modelClient: Model<ClientDocument>
    ) {
        super(modelClient);
    }
}
