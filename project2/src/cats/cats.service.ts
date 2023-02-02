import { ForbiddenException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { CatRequestDto } from "./dto/cats.request.dto";
import { CatsRepository } from "./cats.repository";
import { Cat } from "./cats.schema";

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

  async uploadImg(cat: Cat, files: Array<Express.Multer.File>) {
    const fileName = `cats/${files[0].filename}`;

    const newCat = await this.catsRepository.findByIdAndUpdateImg(cat.id, fileName);

    return newCat;
  }

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();

    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);

    return readOnlyCats;
  }
}
