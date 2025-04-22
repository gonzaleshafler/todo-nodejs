import { Workspace } from "../../entities/workspace";
import { AppDataSource } from "../../../data-source";
import { WorkspaceDto } from "../../dto/WorkspaceDto";

export class UpdateWorkspaceUseCase {
  private repository = AppDataSource.getRepository(Workspace);

  async exec(id: number, updateData: Partial<Workspace>) {
    return await this.repository.update(id, updateData);
  }
}
