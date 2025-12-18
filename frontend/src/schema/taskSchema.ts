import * as z from "zod";

export const taskSchema = z.object({
  title: z.string().max(100, "Title must be at most 100 characters"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required"),
  priority: z.enum(["Low", "Medium", "High"]), // removed "Urgent" if not in form
  status: z.enum(["ToDo", "InProgress", "Review", "Completed"]), // match your <select> values
  assignedToId: z.string().min(1, "Assignee is required"),
});

export type TaskFormData = z.infer<typeof taskSchema>;
