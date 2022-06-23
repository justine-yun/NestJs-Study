import {Controller, Get, Req, Body, Param, ParamData} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import {CatsService} from "./cats/cats.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly catsService: CatsService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
