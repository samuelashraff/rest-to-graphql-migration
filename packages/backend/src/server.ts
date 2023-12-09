import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { gqlRouter } from "./routes";

const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(gqlRouter.routes());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Koa server is running on http://localhost:${PORT}`);
});
