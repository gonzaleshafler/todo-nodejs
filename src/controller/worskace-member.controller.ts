import { Request, Response, Router } from "express";
import { WorkspaceMemberService } from "../service/workspace-member.service";
import { AuthenticatedRequest, verifyToken } from "../middleware/auth";
import { WorkspaceMemberRepository } from "../repositories/workspace-members/workspace-member-repository.service";

export class WorkspaceMemberController {
  router = Router();
  private workspaceMemberService = new WorkspaceMemberService(new WorkspaceMemberRepository());

  constructor() {
    this.router.get(
      "/workspaces/:workspaceId/members", verifyToken,
      this.getMembers.bind(this),
    );
    this.router.post(
      "/workspaces/:workspaceId/invites", verifyToken,
      this.inviteMember.bind(this),
    );

    this.router.post(
      "/workspaces/invites/accept",
      this.acceptInvite.bind(this),
    );
    this.router.put(
      "/workspaces/:workspaceId/members/:userId",
      this.updateRole.bind(this),
    );
    this.router.delete(
      "/workspaces/:workspaceId/members/:userId",
      this.removeMember.bind(this),
    );
  }

  async getMembers(req: AuthenticatedRequest, res: Response) {
    try {
      const workspaceId = parseInt(req.params.workspaceId);
      const userId = req.user.id;

      console.log(workspaceId, userId);
      const members = await this.workspaceMemberService.getWorkspaceMembers(
        workspaceId,
        userId);
      res.status(200).json(members);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async inviteMember(req: AuthenticatedRequest, res: Response) {
    try {
      const { email, userId, role } = req.body;
      const ownerId = req.user.id;
      const workspaceId = parseInt(req.params.workspaceId);
      console.log(email, userId, role, workspaceId);
      const resp = await this.workspaceMemberService.create(
        ownerId,
        workspaceId);
      console.log(resp);
      
      res.status(201).json(resp);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  async acceptInvite(req: AuthenticatedRequest, res: Response) {}
  async updateRole(req: AuthenticatedRequest, res: Response) {}
  async removeMember(req: AuthenticatedRequest, res: Response) {}

}
