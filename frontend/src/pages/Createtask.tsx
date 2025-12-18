import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskFormData } from "../schema/taskSchema";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useState } from "react";
import { useTasks, mutate as mutateTasks } from "../hooks/useTask";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const { isLoading, isError } = useTasks();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p>Failed to load tasks</p>;

  const onSubmit = async (data: TaskFormData) => {
 
    setLoading(true);
    setErrorMsg("");

    const payload = {
      ...data,
      assignedToId: Number(data.assignedToId), // convert to number for backend
      dueDate: new Date(data.dueDate).toISOString(), // send ISO string
    };

    try {
      const res = await fetch("http://localhost:5000/api/task/createtask", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("Response:", res.ok, result);

      if (!res.ok || !result.success) {
        setErrorMsg(result?.message || "Failed to create task");
        console.error(result?.message);
      } else {
        reset();
        await mutateTasks(); // refresh SWR tasks cache
        navigate("/dashboard");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-md shadow-md space-y-4"
    >
      <h2 className="text-gray-900 font-semibold">Create Task</h2>

      {errorMsg && <p className="text-red-500">{errorMsg}</p>}

      {/* Title */}
      <div>
        <label className="block font-medium mb-1">Title</label>
        <Input type="text" {...register("title")} />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          {...register("description")}
          className="w-full p-2 border rounded-md"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Due Date */}
      <div>
        <label className="block font-medium mb-1">Due Date</label>
        <Input type="datetime-local" {...register("dueDate")} />
        {errors.dueDate && (
          <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>
        )}
      </div>

      {/* Priority */}
      <div>
        <label className="block font-medium mb-1">Priority</label>
        <select {...register("priority")} className="w-full p-2 border rounded-md">
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.priority && (
          <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block font-medium mb-1">Status</label>
        <select {...register("status")} className="w-full p-2 border rounded-md">
          <option value="">Select Status</option>
          <option value="ToDo">To Do</option>
          <option value="InProgress">In Progress</option>
          <option value="Review">Review</option>
          <option value="Completed">Completed</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
        )}
      </div>

      {/* Assigned To ID */}
      <div>
        <label className="block font-medium mb-1">Assigned To ID</label>
        <Input type="number" {...register("assignedToId")} />
        {errors.assignedToId && (
          <p className="text-red-500 text-sm mt-1">{errors.assignedToId.message}</p>
        )}
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Task"}
        </Button>
      </div>
    </form>
  );
};

export default CreateTask;
