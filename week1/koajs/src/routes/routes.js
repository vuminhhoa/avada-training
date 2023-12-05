import Router from "koa-router";
import * as bookHandler from "../handlers/books/bookHandlers";
import * as productHandler from "../handlers/products/productHandlers";
import bookInputMiddleware from "../middleware/bookInputMiddleware";
import productInputMiddleware from "../middleware/productInputMiddleware";

// Prefix all routes with /books
const router = new Router({
  prefix: "/api",
});

// Routes will go here

router.get("/books", bookHandler.getBooks);
router.get("/books/:id", bookHandler.getBook);
router.post("/books", bookInputMiddleware, bookHandler.save);

router.get("/products", productHandler.getProducts);
router.get("/products/:id", productHandler.getProduct);
router.post("/products", productInputMiddleware, productHandler.save);
router.put("/products/:id", productHandler.updateOneProduct);
router.delete("/products/:id", productHandler.deleteProduct);

export default router;
