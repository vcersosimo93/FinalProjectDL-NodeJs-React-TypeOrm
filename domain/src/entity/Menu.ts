import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn ,ManyToMany} from "typeorm"
import { Pedido } from "./Pedido"
import { MenuOpcionesFecha } from "./MenuOpcionesFecha"
import { DetalleMenu } from "./DetalleMenu"

@Entity()
export class Menu {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable :false})
    esVegetariano: boolean

    @Column({nullable :false})
    descripcion: string

    @OneToMany(() => Pedido, (pedido) => pedido.menu)
    @JoinColumn({name: 'menu_id_pedidos'})
    pedidos: Pedido[]

    @OneToMany(() => DetalleMenu, (detalleMenu) => detalleMenu.menu)
    @JoinColumn({name: 'menu_id_detallesMenu'})
    detallesMenu: DetalleMenu[]

    @ManyToMany(() => MenuOpcionesFecha, (menuOpcionesFecha) => menuOpcionesFecha.menu)
    menuOpcionesFecha: MenuOpcionesFecha[]
}
