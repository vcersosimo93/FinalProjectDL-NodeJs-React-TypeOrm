import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm"
import { DetalleMenu } from "./DetalleMenu"

@Entity()
export class Ingrediente {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable :false})
    nombre : string

    @Column({nullable :false})
    stock : number

    @OneToMany(() => DetalleMenu, (detalleMenu) => detalleMenu.ingrediente)
    @JoinColumn({name: 'ingrediente_id_detallesMenu'})
    detallesMenu: DetalleMenu[]
}
