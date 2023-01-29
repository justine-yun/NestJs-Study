import { ForbiddenException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { CatRequestDto } from "./dto/cats.request.dto";
import { CatsRepository } from "./cats.repository";

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;

    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new ForbiddenException("해당 고양이가 이미 존재합니다.");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
