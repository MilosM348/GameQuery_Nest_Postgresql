import { IsString, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEntryDto {
  @ApiProperty()
  @IsString()
  TextString: string;

  @ApiProperty()
  TypeID: string;

  @ApiProperty()
  RegionID: string;

  @ApiProperty()
  ZoneID: string;

  @ApiProperty()
  Possessor_Entry: string;

  @ApiProperty()
  Possessor_Zone: string;

  @ApiProperty()
  Possessor_Region: string;

  @ApiProperty()
  Possessor_Entity: string;

  @ApiProperty()
  Object: string
}
