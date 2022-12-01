import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Horario } from "./Horario"
import { Empleado } from "./Empleado"
import { Menu } from "./Menu"

@Entity()
export class Pedido {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Empleado, (empleado) => empleado.pedidos)
    empleado: Empleado

    @ManyToOne(() => Menu, (menu) => menu.pedidos)
    menu: Menu

    @ManyToOne(() => Horario, (horario) => horario.pedidos)
    horario: Horario

    @Column({nullable :false})
    fechaSolicitud: Date

    @Column({nullable :false})
    fechaAlmuerzo: Date

    @Column({nullable :false})
    estaProcesado: Boolean
}
