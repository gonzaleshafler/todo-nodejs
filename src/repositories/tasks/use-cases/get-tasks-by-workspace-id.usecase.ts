import { AppDataSource } from "../../../data-source";
import { Task } from "../../entities/task";

export class GetTasksByWorkspaceId {
  private taskRepository = AppDataSource.getRepository(Task);

  async exec(workspaceId: number) {
    return await this.taskRepository.find({
      where: {
        workspace: { id: workspaceId },
        parentTask: null, 
      },
      relations: {
        subTasks: true, 
      },
    });
  }
}
