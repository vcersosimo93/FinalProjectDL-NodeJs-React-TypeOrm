import { Entity, Column, JoinColumn, ManyToMany,PrimaryColumn } from "typeorm"
import { Menu } from "./Menu"

@Entity()
export class MenuOpcionesFecha {

    @PrimaryColumn({name : 'menuId'})
    menuId : number

    @PrimaryColumn({nullable :false})
    fechaAPublicar: Date

    @ManyToMany(() => Menu, (menu) => menu.menuOpcionesFecha)
    @JoinColumn({ name : 'menuId'})
    menu: Menu
}
