import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToMany } from "typeorm"
import { MenuOpcionesFecha } from "./MenuOpcionesFecha"


@Entity()
export class Reaccion {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable :false})
    emoji: string
  
    @OneToMany(() => MenuOpcionesFecha, (menu) => menu.reaccion)
    @JoinColumn({name: 'reaccionId'})
    menus: MenuOpcionesFecha[]
}
