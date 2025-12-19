import * as z from "zod";

export const taskSchema = z.object({
  title: z.string().max(100, "Title must be at most 100 characters"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required"),
  priority: z.enum(["Low", "Medium", "High"]), 
  status: z.enum(["ToDo", "InProgress", "Review", "Completed"]), 
  assignedToName: z.string().nonempty("Please select a user"),
});

export type TaskFormData = z.infer<typeof taskSchema>;
