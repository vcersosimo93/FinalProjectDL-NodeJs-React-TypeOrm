import { Entity, JoinTable, JoinColumn, ManyToMany,PrimaryColumn } from "typeorm"
import { Menu } from "./Menu"

@Entity()
export class MenuOpcionesFecha {

    @PrimaryColumn({name : 'menuId'})
    menuId : number

    @PrimaryColumn({nullable :false})
    fechaAPublicar: Date

}

