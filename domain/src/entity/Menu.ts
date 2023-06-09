import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn ,ManyToMany} from "typeorm"
import { Pedido } from "./Pedido"
import { MenuOpcionesFecha } from "./MenuOpcionesFecha"


@Entity()
export class Menu {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable :false})
    esVegetariano: boolean

    @Column({unique : true, nullable :false})
    descripcion: string

    @OneToMany(() => Pedido, (pedido) => pedido.menu)
    @JoinColumn({name: 'menu_id_pedidos'})
    pedidos: Pedido[]    
}
