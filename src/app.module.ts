import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {APP_GUARD} from "@nestjs/core";
import {UserModule} from './domain/user/user.module';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [AuthModule, UserModule,
        MongooseModule.forRoot('mongodb://localhost:27017/bip')],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
    },],
})
export class AppModule {
}
