import { useTasks } from "../hooks/useTask";
import { useUsers } from "../hooks/useUsers";

const Dashboard = () => {
  const { tasks, isLoading: tasksLoading, isError: tasksError } = useTasks();
  const { usersById, isLoading: usersLoading, isError: usersError } = useUsers();

  // Loading and error handling
  if (tasksLoading || usersLoading) return <p>Loading tasks...</p>;
  if (tasksError || usersError) return <p>Failed to load tasks</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
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
                <th className="py-2 px-4 border-b text-left">Assigned To</th>
              </tr>
            </thead>
            <tbody>
            {tasks.map((task: any) => (
  <tr key={task.id} className="hover:bg-gray-50">
    <td className="py-2 px-4 border-b">{task.title}</td>
    <td className="py-2 px-4 border-b">{task.description}</td>
    <td className="py-2 px-4 border-b">
      {new Date(task.dueDate).toLocaleString()}
    </td>
    <td className="py-2 px-4 border-b">{task.priority}</td>
    <td className="py-2 px-4 border-b">{task.status}</td>
    <td className="py-2 px-4 border-b">
      {/* Check if assigned user exists before trying to access the name */}
      {usersById[task.assignedToId] ? usersById[task.assignedToId].name : "User not found"}
    </td>
  </tr>
))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
