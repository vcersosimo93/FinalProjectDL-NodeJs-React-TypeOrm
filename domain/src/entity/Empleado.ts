import { Entity, PrimaryGeneratedColumn, Column , OneToMany, JoinColumn } from "typeorm"
import { Feedback } from "./Feedback"
import { Pedido } from "./Pedido"


@Entity()
export class Empleado {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable :false})
    nombre: string

    @Column({nullable :true})
    foto: string

    @Column({nullable :true})
    idSlack : string

    @OneToMany(() => Pedido, (pedido) => pedido.empleado)
    @JoinColumn({name: 'empleado_id_Pedidos'})
    pedidos: Pedido[]
}
