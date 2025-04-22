import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./user";
import { WorkspaceMember } from "./workspace-members";
import { Task } from "./task";

@Entity()
export class Workspace {


  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Task, (task) => task.workspace)
  tasks: Task[];

  @OneToMany(() => WorkspaceMember, (member) => member.workspace)
  members: WorkspaceMember[];

  @ManyToOne(() => WorkspaceMember, { onDelete: "SET NULL" })
  @JoinColumn({ name: "created_by" })
  createdBy: WorkspaceMember | null;
 

}
