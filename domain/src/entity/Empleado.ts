import { Entity, PrimaryGeneratedColumn, Column , OneToMany, JoinColumn } from "typeorm"
import { Feedback } from "./Feedback"
import { Pedido } from "./Pedido"


@Entity()
export class Empleado {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable :false})
    nombre: string

    @Column()
    foto: string

    @OneToMany(() => Feedback, (feedback) => feedback.empleado)
    @JoinColumn({name: 'empleado_id_Feedbacks'})
    feedbacks: Feedback[]

    @OneToMany(() => Pedido, (pedido) => pedido.empleado)
    @JoinColumn({name: 'empleado_id_Pedidos'})
    pedidos: Pedido[]
}
