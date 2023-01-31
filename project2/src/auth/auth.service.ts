import { HttpException, Injectable } from "@nestjs/common";
import { CatsRepository } from "src/cats/cats.repository";
import { LoginRequestDto } from "./dto/login.request.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly catsRepository: CatsRepository, private jwtService: JwtService) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new HttpException("이메일과 비밀번호를 확인해주세요", 401);
    }

    const isPasswordValidated: boolean = bcrypt.compareSync(password, cat.password);

    if (!isPasswordValidated) {
      throw new HttpException("이메일과 비밀번호를 확인해주세요", 401);
    }

    const payload = { email: email, sub: cat.id };

    return {
      token: this.jwtService.sign(payload, { secret: process.env.SECRET_KEY }),
    };
  }
}
