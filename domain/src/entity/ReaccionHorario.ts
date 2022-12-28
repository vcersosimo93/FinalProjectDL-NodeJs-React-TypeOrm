import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToMany } from "typeorm"
import { Horario } from "./Horario"


@Entity()
export class ReaccionHorario {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable :false})
    emojiHorario: string
  
    @OneToMany(() => Horario, (horario) => horario.reaccionHorario)
    @JoinColumn()
    horarios: Horario[]
}
