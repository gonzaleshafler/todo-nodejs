import { Workspace } from "../../entities/workspace";
import { AppDataSource } from "../../../data-source";
import { WorkspaceDto } from "../../dto/WorkspaceDto";

export class CreateWorkspaceUseCase {
  private repository = AppDataSource.getRepository(Workspace);

  async exec(title: string) {
    return await this.repository.save({title});
  }
}
