import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LocalStrategy} from './local.strategy';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from './constants';
import {JwtStrategy} from "./jwt.strategy";
import {UserService} from "../domain/user/user.service";
import {UserModule} from "../domain/user/user.module";

@Module({
    imports: [
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '6000s' },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}