import {InjectModel} from "@nestjs/mongoose";
import {Cat} from "./cats.schema";
import {Model} from "mongoose";
import {HttpException, Injectable} from "@nestjs/common";
import {CatRequestDto} from "./dto/cats.request.dto";

@Injectable()
export class CatsRepository {
    constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

    async existByEmail(email: string): Promise<boolean> {
        return !!(await this.catModel.exists({email}));
    }

    async create(cat: CatRequestDto): Promise<Cat> {
        return await this.catModel.create(cat);
    }

    async findCatByEmail(email: string): Promise<Cat | null> {
        return this.catModel.findOne({email});
    }

    async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
        return this.catModel.findById(catId).select('-password');
    }
}