import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Workspace } from "./workspace";
import { Task } from "./task";
import { WorkspaceMember } from "./workspace-members";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;


  @OneToMany(() => WorkspaceMember, (member) => member.user)
  memberships: WorkspaceMember[];
}
