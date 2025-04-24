import { AppDataSource } from "../../../data-source";
import { UpdateTaskDto } from "../../dto/UpdateTaskDto";
import { Task } from "../../entities/task";

export class UpdateTaskById {
  private taskRepository = AppDataSource.getRepository(Task);

  async exec(taskData: UpdateTaskDto): Promise<Task> {
    return await this.taskRepository.save(taskData);
  }
}
