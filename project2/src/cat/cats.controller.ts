import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { PositiveIntPipe } from "src/common/pipes/positiveInt.pipe";
import { CatsService } from "./cats.service";

@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    return {
      cat: "all cat",
    };
  }

  @Get(":id")
  getOneCat(@Param("id", ParseIntPipe, PositiveIntPipe) id: number) {
    return "get one cat";
  }

  @Post(":id")
  createCat() {
    return "create cat";
  }

  @Patch(":id")
  updateCat() {
    return "update cat";
  }

  @Delete(":id")
  deleteCat() {
    return "delete cat";
  }
}
