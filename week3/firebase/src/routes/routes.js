import Router from "koa-router";
import * as todoHandler from "../handlers/todos/todoHandlers";
import todoInputMiddleware from "../middleware/todoInputMiddleware";

const router = new Router({
  prefix: "/api",
});

router
  .get("/todos", todoHandler.getTodos)
  .get("/todos/:id", todoHandler.getTodo)
  .post("/todos", todoInputMiddleware, todoHandler.createTodo)
  .put("/todos/:id", todoHandler.updateTodo)
  .put("/todos", todoHandler.updateTodos)
  .delete("/todos/:id", todoHandler.deleteTodo)
  .delete("/todos", todoHandler.deleteTodos);

export default router;
