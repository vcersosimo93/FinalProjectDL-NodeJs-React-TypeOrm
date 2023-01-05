import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, Timestamp,ManyToOne,BeforeInsert,BeforeUpdate} from "typeorm"
import { Pedido } from "./Pedido"


@Entity()
export class Horario{

    @PrimaryGeneratedColumn()
    id: number

    @Column('time',{nullable :false, unique : true})
    hora: Date

    @Column({nullable :false})
    limitePersonas : number

    @OneToMany(() => Pedido, (pedido) => pedido.horario)
    @JoinColumn({name: 'horario_id'})
    pedidos: Pedido[]

}
