import { isNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
// import { IsUnique } from "src/services/is-unique.decorator";
// import { Type } from "../entities/type.entity";

export class CreateTypeDto {
  @ApiProperty()
  @IsString()
  TextString: string;
}
