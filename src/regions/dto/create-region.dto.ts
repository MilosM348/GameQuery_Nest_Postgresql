import { IsString, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRegionDto {
  @ApiProperty()
  @IsString()
  TextString: string;

  @ApiProperty()
  Possessing_Zone: string;

  @ApiProperty()
  Possessing_Map: string;

  @ApiProperty()
  TypeID: string;
}
