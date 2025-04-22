import { User } from "../../entities/user";
import { AppDataSource } from "../../../data-source";
import { WorkspaceMember } from "../../entities/workspace-members";

export class UpdateWorkspaceMemberUseCase {
  private repository = AppDataSource.getRepository(WorkspaceMember);

  async exec(id: number, updateData: Partial<WorkspaceMember>) {
    await this.repository.update(id, updateData);
    return await this.repository.findOneBy({ id });
  }
}