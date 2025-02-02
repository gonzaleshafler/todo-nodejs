import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ToDo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
  
}
