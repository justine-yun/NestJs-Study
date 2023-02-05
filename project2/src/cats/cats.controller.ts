import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "src/auth/auth.service";
import { CatsService } from "./cats.service";
import { CatRequestDto } from "./dto/cats.request.dto";
import { ReadOnlyCatDto } from "./dto/cats.response.dto";
import { LoginRequestDto } from "src/auth/dto/login.request.dto";
import { JwtAuthGuard } from "src/auth/jwt/jwt.guard";
import { CurrentUser } from "src/common/decorators/user.decorator";
import { Cat } from "./cats.schema";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "src/common/utils/multer.options";

@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService, private readonly authService: AuthService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "현재 고양이 호출" })
  getCurrentCat(@CurrentUser() cat: Cat) {
    return cat.readOnlyData;
  }

  @Get("all")
  @ApiOperation({ summary: "모든 고양이 가져오기" })
  async getAllCat() {
    return await this.catsService.getAllCat();
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

  @Post("upload")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("image"))
  @ApiOperation({ summary: "고양이 프로필 사진 업로드" })
  uploadCatImg(@UploadedFile() file: Express.Multer.File, @CurrentUser() cat: Cat) {
    return this.catsService.uploadImg(cat, file);
  }
}
