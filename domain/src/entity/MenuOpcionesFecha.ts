import { Entity, JoinColumn, ManyToOne ,PrimaryColumn, BeforeInsert, Column } from "typeorm"
import { Reaccion } from "./Reaccion"
import { getMenuNombre } from "../controllers/MenuController"
import { getEmoji } from "../controllers/ReaccionController"

@Entity()
export class MenuOpcionesFecha {

    @PrimaryColumn({name : 'menuId'})
    menuId : number

    @PrimaryColumn({nullable :false})
    fechaAPublicar: Date

    @Column({name : 'reaccionId'})
    reaccionId : number

    @ManyToOne(() => Reaccion, (reaccion) => reaccion.menus)
    @JoinColumn({ name : 'reaccionId'})
    reaccion: Reaccion

    @Column({nullable :true})
    reaccionEmoji: string

    @Column({nullable :true})
    menuNombre: string

    @BeforeInsert()
    async HandleBeforeInsert() {
        let mN = await getMenuNombre(this.menuId)
        this.menuNombre = mN
        let emoji = await getEmoji(this.reaccionId)
        this.reaccionEmoji = emoji 
    }

}

