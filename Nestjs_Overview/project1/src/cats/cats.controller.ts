import {Controller, Get, Post, Put, Patch, Delete, HttpException, UseFilters, Param, ParseIntPipe } from '@nestjs/common';
import { CatsService } from "./cats.service";
import {HttpExceptionFilter} from "../http-exception.filter";

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
    constructor(private readonly catService: CatsService) {}

    @Get()
    getAllCats() {
        throw new HttpException('api broken', 401);
        return 'all cat';
    }

    @Get(':id')
    getCat(@Param('id', ParseIntPipe) param: number) {
        console.log(param);
        console.log(typeof param);
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
