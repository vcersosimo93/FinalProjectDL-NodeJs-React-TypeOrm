import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity()
export class PosteoDiario {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 1000, nullable :false})
    posteo: string
  
}
