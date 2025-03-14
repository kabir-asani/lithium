import "dotenv/config";

import { serve } from "@hono/node-server";
import app from "./routes/app";

const port = process.env.PORT || "3000";

serve(
  {
    fetch: app.fetch,
    port: parseInt(port),
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
