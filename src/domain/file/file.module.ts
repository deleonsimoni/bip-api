import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {ClientService} from "../client/client.service";
import {ClientController} from "../client/client.controller";
import {FileService} from "./file.service";

@Module({
    imports: [ConfigModule],
    providers: [FileService],
    exports: [FileService],
})
export class FileModule {

}
