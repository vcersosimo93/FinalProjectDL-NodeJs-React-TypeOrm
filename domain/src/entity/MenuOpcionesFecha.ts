import { Entity, JoinTable, JoinColumn, ManyToMany,PrimaryColumn } from "typeorm"
import { Menu } from "./Menu"

@Entity()
export class MenuOpcionesFecha {

    @PrimaryColumn({name : 'menuId'})
    menuId : number

    @PrimaryColumn({nullable :false})
    fechaAPublicar: Date

    @ManyToMany(() => Menu)
    @JoinTable()
    menu: Menu[]


}


/*
    @ManyToMany(() => Menu, (menu) => menu.menuOpcionesFecha)
    @JoinColumn({ name : 'menuId'})
    menu: Menu[]
*/