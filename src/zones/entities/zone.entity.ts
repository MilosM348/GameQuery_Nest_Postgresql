import { Column, Entity, JoinColumn, ManyToOne, BeforeInsert, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "src/types/entities/type.entity"

@Entity()
export class Zone {
    @PrimaryGeneratedColumn()
    ZoneID: string;

    @Column()
    TextString: string;

    @Column()
    MapList: string;

    @Column()
    TypeID: string;

    @ManyToOne(type => Type)
    @JoinColumn({ name: "TypeID" })
    type: Type

}
