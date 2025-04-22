import { Request, Response, Router } from "express";
import { WorkspaceService } from "../service/workspace.service";

import { AuthenticatedRequest, verifyToken } from "../middleware/auth";
import {checkAccess} from "../middleware/access"
import { WorkspaceMemberService } from "../service/workspace-member.service";
export class WorkspaceController {
  public router = Router();

  

  constructor(private workspaceService: WorkspaceService ) {
    this.router.post("/", verifyToken, this.create.bind(this));

    this.router.get("/:id", verifyToken, checkAccess, this.getById.bind(this));

    this.router.put("/:id", verifyToken, this.update.bind(this));

    this.router.delete("/:id", verifyToken, this.delete.bind(this));

    this.router.get("/", verifyToken, this.getAll.bind(this));
   
  }
  private async create(req: AuthenticatedRequest, res: Response) {
    try {
      const { title } = req.body;
      console.log(req.user.id)
      const workspace = await this.workspaceService.createWorkspace(
        req.user.id, 
        title
      );
      res.status(201).json(workspace);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  private async getById(req: AuthenticatedRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const workspaceResponse = await this.workspaceService.getWorkspaceById(
        id,
        req.user.id,
      );
      res.status(200).json(workspaceResponse);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  private async getAll(req: AuthenticatedRequest, res: Response) {
    try {
      res
        .status(200)
        .json(await this.workspaceService.getAllWorkspaces(req.user.id));
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }




  private async update(req: AuthenticatedRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;

      res
        .status(200)
        .json(
          await this.workspaceService.updateWorkspace(
            id,
            updateData
          ),
        );
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  private async delete(req: AuthenticatedRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await this.workspaceService.deleteWorkspaceById(id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
