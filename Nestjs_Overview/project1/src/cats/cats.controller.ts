import {
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Delete,
    HttpException,
    UseFilters,
    Param,
    ParseIntPipe,
    UseInterceptors, ValidationPipe, UsePipes, Body
} from '@nestjs/common';
import { CatsService } from "./cats.service";
import {HttpExceptionFilter} from "../common/exceptions/http-exception.filter";
import {SuccessInterceptor} from "../common/interceptors/success.interceptor";
import {CatRequestDto} from "./dto/cats.request.dto";

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
    constructor(private readonly catService: CatsService) {}

    @Get()
    getCurrentCat() {
        return 'current cat';
    }

    @Post()
    async signUp(@Body() body: CatRequestDto) {
        return await this.catService.signUp(body);
    }

    @Post('login')
    logIn() {
        return 'login';
    }

    @Post('logout')
    logOut() {
        return 'logout';
    }

    @Post('upload/cats')
    uploadCatImg() {
        return 'uploadImg';
    }
}
