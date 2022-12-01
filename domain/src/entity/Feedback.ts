import { Entity, PrimaryGeneratedColumn, Column , ManyToOne, JoinColumn} from "typeorm"
import { Empleado } from "./Empleado"


@Entity()
export class Feedback {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable :false})
    comentario: string

    @ManyToOne(() => Empleado, (empleado) => empleado.feedbacks)
    empleado: Empleado

}
