import { AppDataSource } from "../../../data-source";
import { TaskDto } from "../../dto/TaskDto";
import { Task } from "../../entities/task";

export class UpdateTaskById {
  private taskRepository = AppDataSource.getRepository(Task);

  async exec(taskData: TaskDto) {
    return await this.taskRepository.save(taskData);
  }
}
