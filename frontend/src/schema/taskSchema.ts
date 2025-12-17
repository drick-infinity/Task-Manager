import * as z from "zod"

export const taskSchema = z.object({
  title: z.string().max(100, "Title must be at most 100 characters"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required"),
  priority: z.enum(["Low", "Medium", "High", "Urgent"]),
  status: z.enum(["To Do", "In Progress", "Review", "Completed"]),
  creatorId: z.string().min(1, "Creator is required"),
  assignedToId: z.string().min(1, "Assignee is required"),
})

export type TaskFormData = z.infer<typeof taskSchema>
