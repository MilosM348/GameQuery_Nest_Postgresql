import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { Zone } from "src/zones/entities/zone.entity";
import { Region } from "src/regions/entities/region.entity";

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  TypeID: string;

  @ApiProperty({
      description: 'text string'
  })
  @Column()
  TextString: string;

  @OneToMany(type => Zone, zone => zone.type)
  zones: Zone[]

  @OneToMany(type => Region, region => region.type)
  regions: Region[]
}
