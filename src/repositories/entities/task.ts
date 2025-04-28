import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Workspace } from "./workspace";
import { User } from "./user";
import { WorkspaceMember } from "./workspace-members";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: "enum",
    enum: ["todo", "in_progress", "done"],
    default: "todo",
  })
  status: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(() => Task, (task) => task.subTasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_task_id' })
  parentTask: Task;
  
  @OneToMany(() => Task, (task) => task.parentTask, { cascade: ['remove'] })
  subTasks: Task[];
  @ManyToOne(() => Workspace, (workspace) => workspace.tasks, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "workspace_id" })
  workspace: Workspace;

  @ManyToOne(() => WorkspaceMember, (member) => member.tasks, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "created_by" })
  createdBy: WorkspaceMember | null;

  @ManyToOne(() => WorkspaceMember, { nullable: true })
  @JoinColumn({ name: "assigned_to" })
  assignedTo: WorkspaceMember | null;
  task: { id: number };
}
