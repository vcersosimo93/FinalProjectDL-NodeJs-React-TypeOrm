import { Entity, JoinColumn, ManyToOne ,PrimaryColumn, BeforeInsert, Column } from "typeorm"
import { Reaccion } from "./Reaccion"
import { getMenuNombre } from "../controllers/MenuController"
import { getEsVegetariano } from "../controllers/MenuController"
import { getEmoji } from '../controllers/ReaccionController';

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

    @Column({nullable :true})
    esVegetariano: boolean

    @Column({nullable :true})
    emoji: string

    @BeforeInsert()
    async BeforeInsert() {
        this.menuNombre = await getMenuNombre(this.menuId)
        this.emoji =  await getEmoji(this.reaccion)
        this.esVegetariano = await getEsVegetariano(this.menuId)
    }

}

