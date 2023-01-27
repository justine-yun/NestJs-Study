import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { PositiveIntPipe } from "src/common/pipes/positiveInt.pipe";
import { CatsService } from "./cats.service";
import { SuccessInterceptor } from "src/common/interceptors/success.intercepotr";

@Controller("cats")
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    return {
      cats: "get all cat",
    };
  }

  @Get(":id")
  GetOneCat(@Param("id", ParseIntPipe, PositiveIntPipe) id: number) {
    console.log(id);
    console.log(typeof id);
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
