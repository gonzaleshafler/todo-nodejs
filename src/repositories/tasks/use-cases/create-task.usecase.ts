import { AppDataSource } from "../../../data-source";
import { compare, hash } from "bcrypt";
import { SignUpDto } from "../../../auth/dto/sign-up.dto";
import { Task } from "../../entities/task";
import { CreateTaskDto } from "../../dto/CreateTaskDto";

export class CreateTaskUseCase {
  private taskRepository = AppDataSource.getRepository(Task);

  async exec(data: Task): Promise<Task> {
    const task = this.taskRepository.create({
      title: data.title,
      description: data.description,
      status: data.status || "todo",
      createdBy:
        data.createdBy && data.createdBy.id
          ? { id: data.createdBy.id }
          : undefined,
      assignedTo:
        data.assignedTo && data.assignedTo.id
          ? { id: data.assignedTo.id }
          : data.createdBy && data.createdBy.id
            ? { id: data.createdBy.id }
            : undefined,
      parentTask:
        data.parentTask && data.parentTask.id
          ? { id: data.parentTask.id }
          : undefined,
      workspace:
        data.workspace && data.workspace.id
          ? { id: data.workspace.id }
          : undefined,
    });

    return this.taskRepository.save(task);
  }
}
