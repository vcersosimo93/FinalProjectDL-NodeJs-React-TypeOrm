import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm"
import { Menu } from "./Menu"
import { Ingrediente } from "./Ingrediente"

@Entity()
export class DetalleMenu {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable :false})
    cantidad: number

    @ManyToOne(() => Menu, (menu) => menu.detallesMenu)
    menu: Menu

    @ManyToOne(() => Ingrediente, (ingrediente) => ingrediente.detallesMenu)
    ingrediente: Ingrediente
}
