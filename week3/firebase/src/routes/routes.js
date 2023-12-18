import Router from "koa-router";
import * as todoHandler from "../handlers/todos/todoHandlers";
import todoInputMiddleware from "../middleware/todoInputMiddleware";

const router = new Router({
  prefix: "/api",
});

router
  .get("/todos", todoHandler.getTodos)
  .post("/todos", todoInputMiddleware, todoHandler.createTodo)
  .put("/todos", todoHandler.updateTodos)
  .delete("/todos", todoHandler.deleteTodos);

router
  .get("/todo/:id", todoHandler.getTodo)
  .put("/todo/:id", todoHandler.updateTodo)
  .delete("/todo/:id", todoHandler.deleteTodo);

export default router;
