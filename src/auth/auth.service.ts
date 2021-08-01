import {forwardRef, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserService} from "../domain/user/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService)) private userService: UserService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        const isMatch = await bcrypt.compare(password, user.password);
        if (user && isMatch) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const result = await this.validateUser(user.email, user.password);
        if (result == null) {
            throw new UnauthorizedException();
        }
        const payload = {username: result.name, id: result._id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}