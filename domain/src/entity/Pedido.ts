import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert } from "typeorm"
import { Horario } from "./Horario"
import { Empleado } from "./Empleado"
import { Menu } from "./Menu"
import { getMenuNombre } from "../controllers/MenuController"
import { getEmpleadoNombre } from "../controllers/EmpleadoController"

@Entity()
export class Pedido {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable :true})
    empleadoNombre: string

    @Column({name : 'empleadoId'})
    empleadoId : number

    @ManyToOne(() => Empleado, (empleado) => empleado.pedidos)
    @JoinColumn({ name : 'empleadoId'})
    empleado: Empleado

    @Column({name : 'menuId'})
    menuId : number

    @ManyToOne(() => Menu, (menu) => menu.pedidos)
    @JoinColumn({ name : 'menuId'})
    menu: Menu

    @Column({name : 'horarioId'})
    horarioId : number

    @ManyToOne(() => Horario, (horario) => horario.pedidos)
    @JoinColumn({ name : 'horarioId'})
    horario: Horario

    @Column({nullable :false})
    fechaSolicitud: Date

    @Column({nullable :false})
    fueraDeHorario: boolean

    @Column({nullable : true})
    procesado : boolean

    @Column({nullable :true})
    menuNombre: string

    @BeforeInsert()
    async BeforeInsert() {
        this.menuNombre = await getMenuNombre(this.menuId)
        this.empleadoNombre = await getEmpleadoNombre(this.empleadoId)
    }
}
