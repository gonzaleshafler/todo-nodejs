import { AppDataSource } from "../../../data-source";
import { Task } from "../../entities/task";

export class GetTaskById {
  private taskRepository = AppDataSource.getRepository(Task);

  async exec(id: number) {
    return await this.taskRepository.findBy({ id });
  }
}
