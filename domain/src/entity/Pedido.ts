import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert } from "typeorm"
import { Horario } from "./Horario"
import { Empleado } from "./Empleado"
import { Menu } from "./Menu"
import { getMenuNombre } from "../controllers/MenuController"

@Entity()
export class Pedido {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Empleado, (empleado) => empleado.pedidos)
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
    estaProcesado: Boolean

    @Column({nullable :true})
    menuNombre: string

    @BeforeInsert()
    async HandleBeforeInsert() {
        let res;
        res = await getMenuNombre(this.menuId)
        this.menuNombre = res
    }
}
