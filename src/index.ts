import express from "express";

import { AppDataSource } from "./data-source";
import { ToDo } from "./entity/todo";
import { ToDoController } from "./controller/todo.controller";
import { UserController } from "./controller/user.controller";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const todoController = new ToDoController();
app.use("/todo", todoController.router);

const userController = new UserController();
app.use("/user", userController.router);
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
