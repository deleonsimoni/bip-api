import {Module} from '@nestjs/common';
import {ClientService} from './client.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../schemas/user";
import {Client, ClientSchema} from "../schemas/client";

@Module({
  imports: [MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }])],
  providers: [ClientService],
  exports: [ClientService]
})
export class ClientModule {}
