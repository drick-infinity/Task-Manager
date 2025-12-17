import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskFormData } from "../schema/taskSchema";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });
  const onSubmit = async (data: TaskFormData) => {
    try {
      console.log("Login success:", data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-md shadow-md space-y-4"
      >
        <h2 className="text-gray-900 font-semibold">Create Task</h2>
        <div>
          <label className="block font-medium mb-1">Title</label>
          <Input
            type="text"
            {...register("title")}
            className="w-full border rounded-md p-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            {...register("description")}
            className="w-full border rounded-md p-2 border border-[#CADCFC] bg-[#F5F8FF] focus:border-[#00246B] focus:ring-[#00246B]"
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Due Date</label>
          <Input
            type="datetime-local"
            {...register("dueDate")}
            className="w-full border rounded-md p-2"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dueDate.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Priority</label>
          <select
            {...register("priority")}
            className="w-full border rounded-md p-2 border border-[#CADCFC] bg-[#F5F8FF] focus:border-[#00246B] focus:ring-[#00246B]"
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-sm mt-1">
              {errors.priority.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            {...register("status")}
            className="w-full border rounded-md p-2 border border-[#CADCFC] bg-[#F5F8FF] focus:border-[#00246B] focus:ring-[#00246B]"
          >
            <option value="">Select Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Creator ID</label>
          <Input
            type="text"
            {...register("creatorId")}
            className="w-full border rounded-md p-2"
          />
          {errors.creatorId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.creatorId.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Assigned To ID</label>
          <Input
            type="text"
            {...register("assignedToId")}
            className="w-full border rounded-md p-2"
          />
          {errors.assignedToId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.assignedToId.message}
            </p>
          )}
        </div>

        <div className="pt-2">
          <Button type="submit">Create Task</Button>
        </div>
      </form>
    </>
  );
};

export default TaskForm;
