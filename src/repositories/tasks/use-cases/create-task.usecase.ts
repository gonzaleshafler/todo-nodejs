
import { AppDataSource } from "../../../data-source";
import { compare, hash } from "bcrypt";
import { SignUpDto } from "../../../auth/dto/sign-up.dto";
import { Task } from "../../entities/task";
import { TaskDto } from "../../dto/TaskDto";

export class CreateTaskUseCase {

  private taskRepository = AppDataSource.getRepository(Task);


  async exec(data: TaskDto){
    const task = this.taskRepository.create({
      title: data.title,
      description: data.description,
      status: data.status || "todo",
      workspace: { id: data.workspaceId },
      parentTask: data.parentTaskId ? { id: data.parentTaskId } : undefined,
      createdBy: data.createdById ? { id: data.createdById } : undefined,
      assignedTo: data.assignedToId ? { id: data.assignedToId } : undefined,
    });

    return await this.taskRepository.save(task);
  }
}
