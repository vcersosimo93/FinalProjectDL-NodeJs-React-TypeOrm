import { Entity, JoinColumn, ManyToOne ,PrimaryColumn } from "typeorm"
import { Reaccion } from "./Reaccion"

@Entity()
export class MenuOpcionesFecha {

    @PrimaryColumn({name : 'menuId'})
    menuId : number

    @PrimaryColumn({nullable :false})
    fechaAPublicar: Date

    @ManyToOne(() => Reaccion, (reaccion) => reaccion.menus)
    @JoinColumn({ name : 'reaccionId'})
    reaccion: Reaccion


}

