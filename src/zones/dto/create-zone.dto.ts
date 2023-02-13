import { IsString, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateZoneDto {
  @ApiProperty()
  @IsString()
  TextString: string;

  @ApiProperty()
  @IsString()
  MapList: string;

  @ApiProperty()
  TypeID: string;
}
