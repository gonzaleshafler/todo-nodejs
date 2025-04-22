import { AppDataSource } from "../../../data-source";
import { Task } from "../../entities/task";

export class GetTaskByAssignedUserId {
  private taskRepository = AppDataSource.getRepository(Task);

  async exec(userId: number) {
    return await this.taskRepository.findBy({ assignedTo: { id: userId } });
  }
}
