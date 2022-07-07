import {ApiProperty, PickType} from "@nestjs/swagger";
import {Cat} from "../cats.schema";

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const){
    @ApiProperty({
        example: 'abcde12345',
        description: 'id',
    })
    id: string;
}