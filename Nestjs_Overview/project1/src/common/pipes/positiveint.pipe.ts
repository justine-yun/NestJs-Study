import {ArgumentMetadata, HttpException, Injectable, PipeTransform} from "@nestjs/common";


@Injectable()
export class PositiveIntPipe implements PipeTransform {
    transform(value: number, metadata: ArgumentMetadata) {
        console.log(metadata);
        if(value < 0) {
            throw new HttpException('Value cannot be negative', 400);
        }
        return value;
    }
}