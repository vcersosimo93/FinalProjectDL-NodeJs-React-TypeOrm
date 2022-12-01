import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm"
import { Pedido } from "./Pedido"

@Entity()
export class Horario {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column({nullable :false})
    nombreHorario: string

    @Column({nullable :false})
    horaDesde: Date

    @Column({nullable :false})
    limite : number

    @OneToMany(() => Pedido, (pedido) => pedido.horario)
    @JoinColumn({name: 'horario_id'})
    pedidos: Pedido[]
}
