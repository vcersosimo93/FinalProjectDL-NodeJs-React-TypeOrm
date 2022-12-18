import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, Timestamp } from "typeorm"
import { Pedido } from "./Pedido"

@Entity()
export class Horario{

    @PrimaryGeneratedColumn()
    id: number

    @Column('time',{nullable :false})
    hora: Date

    @Column({nullable :false})
    limitePersonas : number

    @OneToMany(() => Pedido, (pedido) => pedido.horario)
    @JoinColumn({name: 'horario_id'})
    pedidos: Pedido[]
}
