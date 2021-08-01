import {forwardRef, Module} from '@nestjs/common';
import {UserService} from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../schemas/user";
import {UserController} from './user.controller';
import {AuthModule} from "../../auth/auth.module";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]), forwardRef(() => AuthModule)],
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController]
})
export class UserModule {
}