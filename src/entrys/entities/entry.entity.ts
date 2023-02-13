import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "src/types/entities/type.entity";
import { Zone } from "src/zones/entities/zone.entity";
import { Region } from "src/regions/entities/region.entity";

@Entity()
export class Entry {
    @PrimaryGeneratedColumn()
    EntryID: string;

    @Column()
    TextString: string;

    @Column()
    RegionID: string;

    @ManyToOne(type => Region)
    @JoinColumn({ name: "RegionID" })
    region: Region;

    @Column()
    TypeID: string;

    @ManyToOne(type => Type)
    @JoinColumn({ name: "TypeID" })
    type: Type;

    @Column()
    ZoneID: string;

    @ManyToOne(type => Zone)
    @JoinColumn({ name: "ZoneID" })
    zone: Zone;

    @Column()
    PossessorEntry : string;

    @ManyToOne(type => Entry)
    @JoinColumn({ name: "PossessorEntry" })
    possessorEntry: Entry;

    @Column()
    PossessorRegion : string;

    @ManyToOne(type => Region)
    @JoinColumn({ name: "PossessorRegion" })
    possessorRegion: Region;

    @Column()
    PossessorZone : string;

    @ManyToOne(type => Zone)
    @JoinColumn({ name: "PossessorZone" })
    possessorZone: Zone;

    @Column()
    PossessorEntity : string;

    @ManyToOne(type => Entry)
    @JoinColumn({ name: "PossessorEntity" })
    possessorEntity: Entry;

    Object: string;
}
