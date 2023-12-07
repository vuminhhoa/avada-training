import Koa from "koa";
import koaBody from "koa-body";
import routes from "./routes/routes.js";
import render from "koa-ejs";
import path from "path";
import cors from "@koa/cors";
const app = new Koa();

render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout/template",
  viewExt: "html",
  cache: false,
  debug: true,
});

app.use(cors());
app.use(koaBody({ parsedMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"] }));

app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(5000);
