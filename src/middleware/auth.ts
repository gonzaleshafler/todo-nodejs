import { env } from "process";

const jwt = require("jsonwebtoken");

import { Request as ExpresRequest } from "express";

export interface AuthenticatedRequest extends ExpresRequest {
  user: {
    id: number;
    email: string;
    usefulData: string;
  };
}

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(403).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token.split(" ")[1], env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
}

export { verifyToken };
