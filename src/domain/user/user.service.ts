import {Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {User, UserDocument} from "../schemas/user";
import {CreateUserDto} from "./dto/createUser.dto";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        //TODO BCRYPTPASS
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.userModel.findOne({username: username}).exec();
    }
}
