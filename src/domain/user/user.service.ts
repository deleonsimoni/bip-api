import {Model} from "mongoose";
import {User, UserDocument} from "../schemas/user";
import {CreateUserDto} from "./dto/createUser.dto";
import {InjectModel} from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import {GenericService} from "../generics/generic.service";
import {HttpException, HttpStatus} from "@nestjs/common";
import {Client} from "../schemas/client";


export class UserService extends GenericService<UserDocument> {

    constructor(
        @InjectModel(User.name) private readonly modelUser: Model<UserDocument>
    ) {
        super(modelUser);
    }


    async findByEmail(email: string): Promise<User | undefined> {
        return this.modelUser.findOne({email: email}).exec();
    }

    override async create(obj: any): Promise<UserDocument> {
        return this.createUser(obj);
    }

    async findAllByOwner(userId): Promise<UserDocument[]> {
        return this.modelUser.find({owner: userId}).exec().catch(reason => reason);
    }

    async countByOwner(userId): Promise<number> {
        return this.modelUser.count({owner: userId}).exec().catch(reason => reason);
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
        const salt = await bcrypt.genSalt();
        createUserDto.password =  await bcrypt.hash(createUserDto.password, salt);
        const createdUser = new this.modelUser(createUserDto);
        return createdUser.save().catch(reason => {
            throw new HttpException(reason, HttpStatus.BAD_REQUEST)
        });
    }

}
