import { Entity, PrimaryGeneratedColumn, Column , ManyToOne, JoinColumn} from "typeorm"
import { Empleado } from "./Empleado"


@Entity()
export class Feedback {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable :false})
    comentario: string

    @Column('date',{nullable :false})
    fecha: Date

    @ManyToOne(() => Empleado, (empleado) => empleado.feedbacks)
    @JoinColumn({ name : 'empleadoId'})
    empleado: Empleado

}
