import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity()
export class PosteoDiario {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 400, nullable :false})
    posteo: string
  
}
