import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "src/types/entities/type.entity";
import { Zone } from "src/zones/entities/zone.entity";

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  RegionID: string;

  @Column()
  TextString: string;

  @Column()
  Possessing_Zone: string;

  @ManyToOne(type => Zone)
  @JoinColumn({ name: "Possessing_Zone" })
  possessing_Zone: Zone

  @Column()
  Possessing_Map: string;

  @Column()
  TypeID: string;

  @ManyToOne(type => Type)
  @JoinColumn({ name: "TypeID" })
  type: Type
}
