import express from "express";

import { TaskController } from "./controller/task.controller";
import { UserController } from "./controller/user.controller";
import { WorkspaceController } from "./controller/workspace.controller";
import { WorkspaceMemberController } from "./controller/worskace-member.controller";
import { UserService } from "./service/user.service";
import { UserRepositoryService } from "./repositories/users/user-repository.service";
import { WorkspaceService } from "./service/workspace.service";
import { WorkspaceRepositoryService} from "./repositories/workspaces/workspace-repository.service";
import { WorkspaceMemberService } from "./service/workspace-member.service";
import { WorkspaceMemberRepository } from "./repositories/workspace-members/workspace-member-repository.service";
import { TaskService } from "./service/task.service";
import { Task } from "./repositories/entities/task";
import { TaskRepositoryService } from "./repositories/tasks/tasks-repository.service";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

//const taskController = new TaskController();
//app.use("/", taskController.router);



const userService = new UserService(new UserRepositoryService());
const userController = new UserController(userService);
app.use("/users", userController.router);



const workspaceMemberService = new WorkspaceMemberService(new WorkspaceMemberRepository());
const workspaceMemberController = new WorkspaceMemberController();
app.use("/", workspaceMemberController.router);
const workspaceService = new WorkspaceService(new WorkspaceRepositoryService(), workspaceMemberService, userService)
const workspaceController = new WorkspaceController(workspaceService);
app.use("/workspaces", workspaceController.router);

const taskController = new TaskController(new TaskService(new TaskRepositoryService()));
app.use("/", taskController.router);
// app.get("/", (req, res) => {
//   const toDoRep = AppDataSource.getRepository(ToDo);
//   const toDo = new ToDo();
//   toDo.title = "First ToDo";
//   toDo.description = "This is the first ToDo";
//   toDoRep.save(toDo);

//   res.send(toDoRep.find());
// });

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.post("/", (req, res) => {
//   const { title, description } = req.body;

//   res.send("fu");
// });

app.listen(port, () => {
  console.log(`Server has started on port ${port}   `);
});
