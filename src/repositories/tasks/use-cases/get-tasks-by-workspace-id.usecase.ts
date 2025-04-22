import { AppDataSource } from "../../../data-source";
import { Task } from "../../entities/task";

export class GetTasksByWorkspaceId {
  private taskRepository = AppDataSource.getRepository(Task);

  async exec(workspaceId: number) {
    return await this.taskRepository.findBy({ workspace: { id: workspaceId } });
  }
}
