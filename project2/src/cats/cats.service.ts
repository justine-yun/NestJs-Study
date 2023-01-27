import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { Cat } from "./cats.schema";
import { CatRequestDto } from "./dto/cats.request.dto";

@Injectable()
export class CatsService {
  constructor(@InjectModel("Cat") private readonly catModel: Model<Cat>) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;

    const isCatExist = await this.catModel.exists({ email: email }).lean();

    if (isCatExist) {
      throw new ForbiddenException("해당 고양이가 이미 존재합니다.");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
