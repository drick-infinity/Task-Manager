import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskFormData } from "../schema/taskSchema";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useState, useEffect } from "react";
import { useTasks, mutate as mutateTasks } from "../hooks/useTask";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  name: string;
};

const CreateTask = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/allusers");
        const result = await response.json();
        if (response.ok && Array.isArray(result.data)) {
          setUsers(result.data);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error("Failed to fetch users", err);
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

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

  if (isLoading || loadingUsers) return <p>Loading...</p>;
  if (isError) return <p>Failed to load tasks</p>;

  const onSubmit = async (data: TaskFormData) => {
    setLoading(true);
    setErrorMsg("");

    const assignedUser = users.find(
      (user) => user.name === data.assignedToName
    );

    if (!assignedUser) {
      setErrorMsg("Assigned user not found");
      setLoading(false);
      return;
    }

    const payload = {
      ...data,
      assignedToId: assignedUser.id,
      dueDate: new Date(data.dueDate).toISOString(),
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

      if (!res.ok || !result.success) {
        setErrorMsg(result?.message || "Failed to create task");
      } else {
        reset();
        await mutateTasks();
        navigate("/dashboard");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Something went wrong");
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

      <div>
        <label className="block font-medium mb-1">Title</label>
        <Input type="text" {...register("title")} />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          {...register("description")}
          className="w-full p-2 border rounded-md"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Due Date</label>
        <Input type="datetime-local" {...register("dueDate")} />
        {errors.dueDate && (
          <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Priority</label>
        <select {...register("priority")} className="w-full p-2 border rounded-md">
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.priority && (
          <p className="text-red-500 text-sm">{errors.priority.message}</p>
        )}
      </div>

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
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Assigned To</label>
        <select
          {...register("assignedToName")}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select User</option>

          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        {errors.assignedToName && (
          <p className="text-red-500 text-sm">
            {errors.assignedToName.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Task"}
      </Button>
    </form>
  );
};

export default CreateTask;
