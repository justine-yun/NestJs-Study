import {
    Controller,
    Get,
    Post,
    UseFilters,
    UseInterceptors, Body, UseGuards, UploadedFiles
} from '@nestjs/common';
import {CatsService} from "./cats.service";
import {HttpExceptionFilter} from "../common/exceptions/http-exception.filter";
import {SuccessInterceptor} from "../common/interceptors/success.interceptor";
import {CatRequestDto} from "./dto/cats.request.dto";
import {ApiOperation, ApiResponse} from '@nestjs/swagger'
import {ReadOnlyCatDto} from "./dto/cat.dto";
import {LoginRequestDto} from "../auth/dto/login.request.dto";
import {AuthService} from "../auth/auth.service";
import {JwtAuthGuard} from "../auth/jwt/jwt.guard";
import {CurrentUser} from "../common/decorators/user.decorator";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {multerOptions} from "../common/utils/multer.options";
import { Cat } from './cats.schema';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
    constructor(private readonly catService: CatsService, private readonly authService: AuthService) {
    }

    @ApiOperation({summary: '현재 고양이 가져오기'})
    @UseGuards(JwtAuthGuard)
    @Get()
    getCurrentCat(@CurrentUser() cat) {
        return cat.readOnlyData;
    }

    @ApiResponse({
        status: 500,
        description: '서버 에러'
    })
    @ApiResponse({
        status: 200,
        description: '성공',
        type: ReadOnlyCatDto
    })
    @ApiOperation({summary: '회원가입'})
    @Post()
    async signUp(@Body() body: CatRequestDto) {
        return await this.catService.signUp(body);
    }

    @ApiOperation({summary: '로그인'})
    @Post('login')
    logIn(@Body() body: LoginRequestDto) {
        return this.authService.jwtLogIn(body);
    }

    // @ts-ignore
    @ApiOperation({summary: '고양이 이미지 업로드'})
    @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
    @UseGuards(JwtAuthGuard)
    @Post('upload')
    uploadCatImg(@UploadedFiles() files: Array<Express.Multer.File>, @CurrentUser() cat: Cat) {
        console.log(files)

        return this.catService.uploadImg(cat, files);
    }
}
