import { Workspace } from "../../entities/workspace";
import { AppDataSource } from "../../../data-source";
import { WorkspaceDto } from "../../dto/WorkspaceDto";

export class DeleteWorkspaceUseCase {
  private repository = AppDataSource.getRepository(Workspace);

  async exec(id: number) {
    const workspace = await this.repository.findOneBy({ id });
    if (!workspace) {
      throw new Error(`Workspace with id ${id} not found`);
    }
    return await this.repository.remove(workspace);
  }
}
