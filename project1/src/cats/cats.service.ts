import { Injectable } from "@nestjs/common";

@Injectable()
export class CatsService {
  hello() {
    return "hello cats";
  }
}
