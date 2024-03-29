import { Controller, Get, Param, Req } from "@nestjs/common";
import { Request } from "express";
import { AppService } from "./app.service";
import { CatsService } from "./cats/cats.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly catsService: CatsService) {}

  @Get()
  getHello(@Req() req: Request, @Param() param): string {
    return this.appService.getHello();
  }

  @Get("aaa")
  getAaa(): string {
    return "hello aaa!";
  }
}
