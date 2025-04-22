import { Workspace } from "../../entities/workspace";
import { AppDataSource } from "../../../data-source";
import { WorkspaceDto } from "../../dto/WorkspaceDto";

export class GetWorkspaceByIdUseCase {
  private repository = AppDataSource.getRepository(Workspace);

  async exec(id: number) {
    return await this.repository.findOneBy({ id });
  }
}
