import Router from "koa-router";
import * as bookHandler from "../handlers/books/bookHandlers";
import * as productHandler from "../handlers/products/productHandlers";
import * as todoHandler from "../handlers/todos/todoHandlers";
import bookInputMiddleware from "../middleware/bookInputMiddleware";
import productInputMiddleware from "../middleware/productInputMiddleware";
import { getAll as getAllProducts } from "../database/productRepository";

const router = new Router({
  prefix: "/api",
});

router.get("/views/products", async (ctx) => {
  const products = getAllProducts();

  await ctx.render("pages/product", { products });
});

router
  .get("/books", bookHandler.getBooks)
  .get("/books/:id", bookHandler.getBook)
  .post("/books", bookInputMiddleware, bookHandler.save);

router
  .get("/products", productHandler.getProducts)
  .get("/products/:id", productHandler.getProduct)
  .post("/products", productInputMiddleware, productHandler.createProduct)
  .put("/products/:id", productHandler.updateProduct)
  .delete("/products/:id", productHandler.deleteProduct);

router
  .get("/todos", todoHandler.getTodos)
  .get("/todos/:id", todoHandler.getTodo)
  .post("/todos", todoHandler.createTodo)
  .put("/todos/:id", todoHandler.updateTodo)
  .put("/todos", todoHandler.updateTodos)
  .delete("/todos/:id", todoHandler.deleteTodo)
  .delete("/todos", todoHandler.deleteTodos);
export default router;
