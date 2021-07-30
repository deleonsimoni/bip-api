import {Controller, Request, Post, UseGuards, Get, Body} from '@nestjs/common';
import {LocalAuthGuard} from './auth/local-auth.guard';
import {AuthService} from './auth/auth.service';
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {Public} from "./auth/skip.auth";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {LoginDto} from "./auth/dto/login.dto";
import {UserService} from "./domain/user/user.service";
import {CreateUserDto} from "./domain/user/dto/createUser.dto";

@Controller()
@ApiTags('teste')
export class AppController {
    constructor(private authService: AuthService, private userService: UserService) {
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Body() login: LoginDto) {
        return this.authService.login(login);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Public()
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Public()
    @Post()
    async create(@Body() user: CreateUserDto) {
        return this.userService.create(user);
    }
}