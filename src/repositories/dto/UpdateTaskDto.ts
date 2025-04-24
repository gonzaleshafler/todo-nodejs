import { Task } from "../entities/task";

export class UpdateTaskDto {
  id: number;
  title?: string;
  description?: string;
  status?: string;
  createdBy?: number;
  assignedTo?: number;
  parentTask?: number;

  constructor(data: Partial<UpdateTaskDto>) {
    Object.assign(this, data);
  }

  toEntity(): Task {
    const task = new Task();
    task.id = this.id;
    task.title = this.title;
    task.description = this.description;
    task.status = this.status;
    return task;
  }
}
