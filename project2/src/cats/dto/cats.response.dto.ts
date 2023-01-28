import { ApiProperty, PickType } from "@nestjs/swagger";
import { Cat } from "../cats.schema";

export class ReadOnlyCatDto extends PickType(Cat, ["email", "name"] as const) {
  @ApiProperty({
    example: "123abc456def789ghi01",
    description: "id",
  })
  id: string;
}
