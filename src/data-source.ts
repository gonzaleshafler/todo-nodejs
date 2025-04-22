import { DataSource } from "typeorm";
import { Task } from "./repositories/entities/task";
import { WorkspaceMember } from "./repositories/entities/workspace-members";
import { User } from "./repositories/entities/user";
import { Workspace } from "./repositories/entities/workspace";

require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Task, User, Workspace, WorkspaceMember],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => console.log("DB connected!"))
  .catch((err) => console.error("DB connection error:", err));
