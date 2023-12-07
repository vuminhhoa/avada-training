import Router from "koa-router";
import * as bookHandler from "../handlers/books/bookHandlers";
import * as productHandler from "../handlers/products/productHandlers";
import * as todoHandler from "../handlers/todos/todoHandlers";
import bookInputMiddleware from "../middleware/bookInputMiddleware";
import productInputMiddleware from "../middleware/productInputMiddleware";
import todoInputMiddleware from "../middleware/todoInputMiddleware";
import { getAll as getAllProducts } from "../database/productRepository";

const router = new Router({
  prefix: "/api",
});

router.get("/views/products", async (ctx) => {
  const products = getAllProducts();

  await ctx.render("pages/product", { products });
});

router.get("/books", bookHandler.getBooks);
router.get("/books/:id", bookHandler.getBook);
router.post("/books", bookInputMiddleware, bookHandler.save);

router.get("/products", productHandler.getProducts);
router.get("/products/:id", productHandler.getProduct);
router.post("/products", productInputMiddleware, productHandler.save);
router.put("/products/:id", productHandler.updateOneProduct);
router.delete("/products/:id", productHandler.deleteProduct);

router.get("/todos", todoHandler.getTodos);
router.get("/todos/:id", todoHandler.getTodo);
router.post("/todos", todoInputMiddleware, todoHandler.save);
router.put("/todos/:id", todoHandler.updateOneTodo);
router.delete("/todos/:id", todoHandler.deleteTodo);
export default router;
