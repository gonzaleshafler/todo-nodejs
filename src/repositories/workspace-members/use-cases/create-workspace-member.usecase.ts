import { AppDataSource } from "../../../data-source";

import { SignUpDto } from "../../../auth/dto/sign-up.dto";
import { WorkspaceMember } from "../../entities/workspace-members";

export class CreateWorkspaceMemberUseCase {
  private repository = AppDataSource.getRepository(WorkspaceMember);
  async exec(
    userId: number,
    workspaceId: number,
    role: "owner" | "admin" | "member",
  ) {
    return await this.repository.save({
      user: { id: userId },
      workspace: { id: workspaceId },
      role,
    });
  }
}
