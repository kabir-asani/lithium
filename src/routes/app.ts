import { Hono } from "hono";
import remindersRoute from "./reminders";

const app = new Hono();

app.get("/health", (c) => {
  return c.json({ status: "ok" }, 200);
});

app.route("/reminders", remindersRoute);

export default app;
