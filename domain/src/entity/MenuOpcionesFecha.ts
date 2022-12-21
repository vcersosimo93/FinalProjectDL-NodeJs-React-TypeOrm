import { Entity, JoinColumn, ManyToOne ,PrimaryColumn, AfterLoad, Column } from "typeorm"
import { Reaccion } from "./Reaccion"
import {getMenuNombre} from "../controllers/MenuController"

@Entity()
export class MenuOpcionesFecha {

    @PrimaryColumn({name : 'menuId'})
    menuId : number

    @PrimaryColumn({nullable :false})
    fechaAPublicar: Date

    @ManyToOne(() => Reaccion, (reaccion) => reaccion.menus)
    @JoinColumn({ name : 'reaccionId'})
    reaccion: Reaccion

    @Column({nullable :true})
    menuNombre: string

    //PROBAR ESTO
    @AfterLoad()
    async afterLoad() {
        let res;
        getMenuNombre(this.menuId, res)
       this.menuNombre  =  res
    }

}

