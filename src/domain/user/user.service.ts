import {Model} from "mongoose";
import {User, UserDocument} from "../schemas/user";
import {CreateUserDto} from "./dto/createUser.dto";
import {InjectModel} from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import {GenericService} from "../GenericService";


export class UserService extends GenericService<UserDocument> {

    constructor(
        @InjectModel(User.name) private readonly modelUser: Model<UserDocument>
    ) {
        super(modelUser);
    }


    async findByEmail(email: string): Promise<User | undefined> {
        return this.modelUser.findOne({email: email}).exec();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const salt = await bcrypt.genSalt();
        createUserDto.password =  await bcrypt.hash(createUserDto.password, salt);
        const createdUser = new this.modelUser(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.modelUser.find().exec();
    }

}
