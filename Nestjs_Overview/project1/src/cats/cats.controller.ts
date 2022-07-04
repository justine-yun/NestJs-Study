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
    getAllCats() {
        return { cats: 'get all cat api' };
    }

    @Get(':id')
    getCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
        return 'one cat';
    }

    @Post()
    createCat() {
        return 'create cat';
    }

    @Put(':id')
    updateCat() {
        return 'update cat';
    }

    @Patch(':id')
    updatePartiallyCat() {
        return 'update partially cat';
    }

    @Delete(':id')
    deleteCat() {
        return 'delete cat';
    }

}
