import { Controller, Get, Post, Put, Patch, Delete } from '@nestjs/common';
import { CatsService } from "./cats.service";

@Controller('cats')
export class CatsController {
    constructor(private readonly catService: CatsService) {}

    @Get()
    getAllCats() {
        return 'all cat';
    }

    @Get(':id')
    getCat() {
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
