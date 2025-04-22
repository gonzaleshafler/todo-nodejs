import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  Unique,
} from "typeorm";
import { User } from "./user";
import { Workspace } from "./workspace";
import { Task } from "./task";

@Entity()
@Unique(["user", "workspace"])
export class WorkspaceMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: ["owner", "admin", "member"],
    default: "member",
  })
  role: string;

  @CreateDateColumn()
  joinedAt: Date;

  @OneToMany(() => Task, (task) => task.assignedTo)
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.memberships, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Workspace, (workspace) => workspace.members, {
    onDelete: "CASCADE",
  })
  workspace: Workspace;
}
