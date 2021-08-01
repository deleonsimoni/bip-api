import {Module} from '@nestjs/common';
import {ClientService} from './client.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../schemas/user";
import {Client, ClientSchema} from "../schemas/client";
import { ClientController } from './client.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }])],
  providers: [ClientService],
  exports: [ClientService],
  controllers: [ClientController]
})
export class ClientModule {}
