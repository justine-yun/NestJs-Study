import { HttpException, Injectable } from "@nestjs/common";
import { CatsRepository } from "src/cats/cats.repository";
import { LoginRequestDto } from "./dto/login.request.dto";

@Injectable()
export class AuthService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async jwtLogin(data: LoginRequestDto) {
    const { email, password } = data;
    const isExist = await this.catsRepository.existsByEmail(email);

    if (!isExist) {
      throw new HttpException("이메일과 비밀번호를 확인해주세요", 401);
    }
  }
}
