import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cat } from "./cats.schema";
import { CatRequestDto } from "./dto/cats.request.dto";

@Injectable()
export class CatsRepository {
  constructor(@InjectModel("Cat") private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ email }).lean().exec();
      console.log(result);
      return result ? true : false;
    } catch (error) {
      throw new HttpException("DB error", 500);
    }
  }

  async create(cat: CatRequestDto) {
    return await this.catModel.create(cat);
  }
}
