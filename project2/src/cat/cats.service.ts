import { Injectable } from "@nestjs/common";

@Injectable()
export class CatsService {
  hello(): string {
    return "hello cat";
  }
}
