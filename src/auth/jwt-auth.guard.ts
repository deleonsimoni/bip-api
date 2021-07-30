import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "./skip.auth";
import passport from "passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        //skip auth
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        // TODO tratar outras fases da autenticação ex: Aparelho válido

        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        // TODO possivelmente lidar de maneira diferente com erros de outras fases da autenticação
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}