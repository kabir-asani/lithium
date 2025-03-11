import { Hono } from "hono";
import { createReminder, deleteReminder, getAllReminders, getReminder } from "../../controllers/reminders/types";
import { validator } from "hono/validator";
import { z } from "zod";

const remindersRoute = new Hono();

remindersRoute.get("", (c) => {
  const reminders = getAllReminders();

  return c.json(reminders, 200);
});

remindersRoute.get("/:id", (c) => {
  const reminderId = c.req.param("id");
  const reminder = getReminder(reminderId);

  if (!reminder) {
    return c.notFound();
  }

  return c.json(reminder, 200);
});

remindersRoute.post(
  "/",
  validator("json", (value, c) => {
    const schema = z.object({
      title: z.string(),
      dueDate: z.string(),
    });

    try {
      const parsed = schema.parse(value);
      return parsed;
    } catch (e) {
      console.log(e);
      return c.json({ error: e }, 401);
    }
  }),
  (c) => {
    const { title, dueDate } = c.req.valid("json");

    const reminder = createReminder({
      title,
      dueDate: new Date(dueDate),
    });

    return c.json(reminder, 201);
  }
);

remindersRoute.delete("/:id", (c) => {
  const reminderId = c.req.param("id");

  deleteReminder(reminderId);

  return c.json({ message: "Reminder deleted" }, 200);
});

export default remindersRoute;
