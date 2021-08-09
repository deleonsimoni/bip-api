import {Body, Controller, forwardRef, Get, Inject, Post, Put, Request} from '@nestjs/common';
import {Public} from "../../auth/skip.auth";
import {LoginDto} from "../../auth/dto/login.dto";
import {CreateUserDto} from "./dto/createUser.dto";
import {AuthService} from "../../auth/auth.service";
import {UserService} from "./user.service";
import {User, UserDocument} from "../schemas/user";
import {GenericController} from "../generics/generic.controller";

@Controller('user')
export class UserController extends GenericController<UserDocument> {
    constructor(@Inject(forwardRef(() => AuthService)) private authService: AuthService, private userService: UserService) {
        super(userService);
    }

    @Public()
    @Post('auth/login')
    async login(@Body() login: LoginDto) {
        return this.authService.login(login);
    }


    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Public()
    @Post('/register')
    async register(@Body() user: CreateUserDto) {
        // const {password, ...result} = await this.userService.create(user);
        return this.userService.create(user);
    }

    @Get()
    override findAll(@Request() req): Promise<UserDocument[]> {
       return this.userService.findAllByOwner(req.user.id);
   }

}
