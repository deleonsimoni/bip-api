import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {APP_GUARD} from "@nestjs/core";
import {UserModule} from './domain/user/user.module';
import {MongooseModule} from "@nestjs/mongoose";
import { CompanyModule } from './domain/company/company.module';
import { ClientModule } from './domain/client/client.module';
import { InventoryModule } from './domain/inventory/inventory.module';
import { SectionModule } from './domain/section/section.module';
import { BipModule } from './domain/bip/bip.module';
import { ItemModule } from './domain/item/item.module';

@Module({
    imports: [AuthModule, UserModule,
        MongooseModule.forRoot('mongodb://localhost:27017/bip'),
        CompanyModule,
        ClientModule,
        InventoryModule,
        SectionModule,
        BipModule,
        ItemModule],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
    },],
})
export class AppModule {
}
