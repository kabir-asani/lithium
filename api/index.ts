import { handle } from "@hono/node-server/vercel";
import app from "../src/routes/app";

export default handle(app);
