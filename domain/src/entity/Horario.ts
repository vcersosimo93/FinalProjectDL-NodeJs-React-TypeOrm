import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, Timestamp,ManyToOne,BeforeInsert,BeforeUpdate} from "typeorm"
import { Pedido } from "./Pedido"
import { ReaccionHorario } from "./ReaccionHorario"
import { getEmojiHorario } from '../controllers/ReaccionHorarioController';

@Entity()
export class Horario{

    @PrimaryGeneratedColumn()
    id: number

    @Column('time',{nullable :false})
    hora: Date

    @Column({nullable :false})
    limitePersonas : number

    @OneToMany(() => Pedido, (pedido) => pedido.horario)
    @JoinColumn({name: 'horario_id'})
    pedidos: Pedido[]

    @Column({nullable :true})
    emojiHorario: string

    @ManyToOne(() => ReaccionHorario, (reaccionHorario) => reaccionHorario.horarios)
    @JoinColumn({ name : 'reaccionHoraId'})
    reaccionHorario: ReaccionHorario

    @BeforeInsert()
    async BeforeInsert() {
        this.emojiHorario =  await getEmojiHorario(this.reaccionHorario)
    }

    @BeforeUpdate()
    async BeforeUpdate() {
        this.emojiHorario =  await getEmojiHorario(this.reaccionHorario)
    }

}
