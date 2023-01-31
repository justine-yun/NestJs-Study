import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { CatsService } from "./cats.service";
import { CatRequestDto } from "./dto/cats.request.dto";
import { ReadOnlyCatDto } from "./dto/cats.response.dto";
import { LoginRequestDto } from "src/auth/dto/login.request.dto";

@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService, private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({ summary: "현재 고양이 호출" })
  getCurrentCat() {
    return "get current cat";
  }

  @Post()
  @ApiOperation({ summary: "회원가입" })
  @ApiResponse({
    status: 201,
    description: "회원가입 성공",
    type: ReadOnlyCatDto,
  })
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @Post("login")
  @ApiOperation({ summary: "로그인" })
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  @Post("logout")
  @ApiOperation({ summary: "로그아웃" })
  logOut() {
    return "log out";
  }
}
