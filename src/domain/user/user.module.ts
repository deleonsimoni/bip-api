import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../schemas/user";
import {AppController} from "../../app.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
