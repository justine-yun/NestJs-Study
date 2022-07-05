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
    UseInterceptors
} from '@nestjs/common';
import { CatsService } from "./cats.service";
import {HttpExceptionFilter} from "../common/exceptions/http-exception.filter";
import {PositiveIntPipe} from "../common/pipes/positiveint.pipe";
import {SuccessInterceptor} from "../common/interceptors/success.interceptor";

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
    async signUp() {
        return 'sign up';
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
