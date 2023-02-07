import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  @Render("index")
  root(): object {
    return {
      data: {
        title: "Chatting",
        content: "hello world 2",
      },
    };
  }
}
