// pages/OverdueTask.tsx
import { useTasks } from "../hooks/useTask";

const OverdueTask = () => {
  const { tasks, isLoading, isError } = useTasks();

  if (isLoading) return <p className="p-6">Loading tasks...</p>;
  if (isError) return <p className="p-6 text-red-500">Failed to load tasks</p>;

  // Get current date
  const now = new Date();

  // Filter tasks where dueDate is in the past
  const overdueTasks = tasks.filter(
    (task: any) => new Date(task.dueDate) < now && task.status !== "Completed"
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Overdue Tasks</h1>

      {overdueTasks.length === 0 ? (
        <p>No overdue tasks.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Title</th>
                <th className="py-2 px-4 border-b text-left">Description</th>
                <th className="py-2 px-4 border-b text-left">Due Date</th>
                <th className="py-2 px-4 border-b text-left">Priority</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Creator</th>
              </tr>
            </thead>
            <tbody>
              {overdueTasks.map((task: any) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{task.title}</td>
                  <td className="py-2 px-4 border-b">{task.description}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(task.dueDate).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">{task.priority}</td>
                  <td className="py-2 px-4 border-b">{task.status}</td>
                  <td className="py-2 px-4 border-b">{task.creatorId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OverdueTask;
