const memberService = require("../service/workspace-member.service");
const taskService = require("../service/task.service");
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth";
import { WorkspaceMemberRepository } from "../repositories/workspace-members/workspace-member-repository.service";
import { WorkspaceMemberService } from "../service/workspace-member.service";

const jwt = require("jsonwebtoken");


async function checkAccess(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(403).json({ error: "Access denied" });
  const workspaceId = parseInt(req.params.workspaceId) || req.body.workspaceId;

  if (!workspaceId) {
    return res.status(400).json({ error: "Workspace ID is required" });
  }

  const membershipService = new WorkspaceMemberService(
    new WorkspaceMemberRepository(),
  );
  const membership = await membershipService.getWorkspaceMembers(
    workspaceId,
    req.user.id,
  );
  if (!membership.find(membership=>membership.user.id === req.user.id)) {
    return res
      .status(403)
      .json({ error: "Access denied: Not a workspace member" });
  }
  next();

}

export { checkAccess };
