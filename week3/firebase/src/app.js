import Koa from "koa";
import koaBody from "koa-body";
import routes from "./routes/routes.js";
import cors from "@koa/cors";
const app = new Koa();

app.use(cors());
app.use(koaBody({ parsedMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"] }));

app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(5000);
