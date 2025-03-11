import crypto from "crypto";

export type Reminder = {
  id: string;
  title: string;
  dueDate: Date;
};

const reminders: Map<string, Reminder> = new Map();

export const createReminder = (parameters: { title: string; dueDate: Date }) => {
  const id = crypto.randomBytes(16).toString("hex").substring(2);

  const reminder = {
    id,
    ...parameters,
  };

  reminders.set(id, reminder);

  return reminder;
};

export const getAllReminders = (): Reminder[] => {
  return Array.from(reminders.values());
};

export const getReminder = (id: string): Reminder | undefined => {
  return reminders.get(id);
};

export const deleteReminder = (id: string): boolean => {
  return reminders.delete(id);
};

export const updateReminder = (id: string, parameters: { title: string; dueDate: Date }): Reminder | undefined => {
  const reminder = reminders.get(id);

  if (!reminder) {
    return undefined;
  }

  reminders.set(id, {
    ...reminder,
    ...parameters,
  });

  return reminders.get(id);
};
