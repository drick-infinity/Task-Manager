import { useState } from "react";
import { useTasks, mutate as mutateTasks } from "../hooks/useTask";
import { useUsers } from "../hooks/useUsers";
import { Button } from "../components/ui/Button";

type Priority = "Low" | "Medium" | "High" | "Urgent";
type Status = "ToDo" | "InProgress" | "Review" | "Completed";


interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  creatorId: number;
  assignedToId: number;
}

const PRIORITY_OPTIONS: Priority[] = ["Low", "Medium", "High", "Urgent"];
const STATUS_OPTIONS: Status[] = ["ToDo", "InProgress", "Review", "Completed"];

const Dashboard = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low" as Priority,
    status: "ToDo" as Status,
    assignedToId: "",
  });

  const { tasks, isLoading: tasksLoading, isError: tasksError } = useTasks();
  const { usersById, isLoading: usersLoading, isError: usersError } = useUsers();

  if (tasksLoading || usersLoading) return <p>Loading tasks...</p>;
  if (tasksError || usersError) return <p>Failed to load tasks</p>;

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setEditFormData({
      title: task.title,
      description: task.description,
      dueDate: new Date(task.dueDate).toISOString().slice(0, 16),
      priority: task.priority,
      status: task.status,
      assignedToId: task.assignedToId.toString(),
    });
    setOpenMenuId(null);
  };

  const handleDelete = async (taskId: number) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(`/api/task/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        alert(result.message || "Failed to delete task");
        return;
      }
      await mutateTasks();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setOpenMenuId(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    if (!editingTask) return;

    try {
      const res = await fetch(`http://localhost:5000/api/task/edit/${editingTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editFormData,
          assignedToId: Number(editFormData.assignedToId),
        }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.message || "Failed to update task");
        return;
      }

      await mutateTasks();
      setEditingTask(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const toggleMenu = (taskId: number) => {
    setOpenMenuId(openMenuId === taskId ? null : taskId);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Due Date</th>
                <th className="py-2 px-4 border-b">Priority</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Assigned To</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task: Task) => (
                <tr key={task.id}>
                  <td className="py-2 px-4 border-b">{task.title}</td>
                  <td className="py-2 px-4 border-b">{task.description}</td>
                  <td className="py-2 px-4 border-b">{new Date(task.dueDate).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">{task.priority}</td>
                  <td className="py-2 px-4 border-b">{task.status}</td>
                  <td className="py-2 px-4 border-b">
                    {usersById[task.assignedToId]?.name || "User not found"}
                  </td>
                  <td className="py-2 px-4 border-b relative">
                    <button onClick={() => toggleMenu(task.id)} className="text-xl px-2">⋮</button>
                    {openMenuId === task.id && (
                      <div className="absolute right-2 mt-2 w-28 bg-white border rounded shadow z-10">
                        <button
                          onClick={() => handleEditClick(task)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingTask && (
  <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded shadow w-96">
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>
      <input
        name="title"
        value={editFormData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full mb-2 border px-2 py-1"
      />
      <textarea
        name="description"
        value={editFormData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-2 border px-2 py-1"
      />
      <input
        type="datetime-local"
        name="dueDate"
        value={editFormData.dueDate}
        onChange={handleChange}
        className="w-full mb-2 border px-2 py-1"
      />
      <select
        name="priority"
        value={editFormData.priority}
        onChange={handleChange}
        className="w-full mb-2 border px-2 py-1"
      >
        {PRIORITY_OPTIONS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <select
        name="status"
        value={editFormData.status}
        onChange={handleChange}
        className="w-full mb-2 border px-2 py-1"
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select
        name="assignedToId"
        value={editFormData.assignedToId}
        onChange={handleChange}
        className="w-full mb-2 border px-2 py-1"
      >
        {Object.values(usersById).map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <div className="flex justify-end space-x-2 mt-2">
        <Button onClick={() => setEditingTask(null)} className="px-3 py-1">
          Cancel
        </Button>
        <Button onClick={handleUpdate} className="px-3 py-1">
          Save
        </Button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Dashboard;
