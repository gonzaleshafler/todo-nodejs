import express from "express";

import { AppDataSource } from "./src/data-source";
import { ToDo } from "./src/entity/ToDo";
import { ToDoController } from "./src/controller/todo.controller";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const todoController = new ToDoController();
app.use("/todo", todoController.router);


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
