import { serve } from "@hono/node-server";
import app from "./routes/app";

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Listening @ http://localhost:${info.port}`);
  }
);
