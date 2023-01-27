import { HttpException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number): number {
    if (value < 0) {
      throw new HttpException("id must be larger than 0", 400);
    }

    return value;
  }
}
