import { Task } from "../entities/task";

export class CreateTaskDto {
  title: string;
  description?: string;
  parentTaskId?: number;
  status?: string;
  assignedToId?: number;
  workspaceId: number;
  createdById: number;

  constructor(data: Partial<CreateTaskDto>) {
    Object.assign(this, data);
  }

  toEntity(): Task {
    const task = new Task();
    task.title = this.title;
    task.description = this.description;
    task.workspace = { id: this.workspaceId } as any;
    task.createdBy = { id: this.createdById } as any;
    task.assignedTo = this.assignedToId ? { id: this.assignedToId } as any : undefined;
    task.parentTask = this.parentTaskId ? { id: this.parentTaskId } as any : undefined;
    task.status = this.status || "todo";
    return task;
  }
}
