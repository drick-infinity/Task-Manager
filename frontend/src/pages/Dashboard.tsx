import { Button } from "../components/ui/Button";

const Dashboard = () => {
  return (
    <>
      <div className="bg-white px-10 py-6 shadow-md rounded-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-600">
          <div className="bg-[#CADCFC] p-4 rounded-md shadow">Total Tasks</div>

          <div className="bg-[#E6E6FA] p-4 rounded-md shadow">
            Pending Tasks
          </div>

          <div className="bg-[#CCE7C9] p-4 rounded-md shadow">In Progress</div>

          <div className="bg-[#00B4D8] p-4 rounded-md shadow">
            Completed Tasks
          </div>
        </div>
      </div>

      <div className="relative mt-6 bg-white shadow-lg p-4 rounded-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full p-4 rounded-md">
          <div className="mb-2 sm:mb-0">
            <div className="font-semibold text-lg">Recent Tasks</div>
          </div>
          <div className="ml-0 sm:ml-4">
            <Button>See all</Button>
          </div>
        </div>

        <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 mt-6 bg-gray-100 p-2 font-semibold rounded-t-md">
          <div>Name</div>
          <div>Priority</div>
          <div>Status</div>
          <div>Created On</div>
        </div>

        <div className="mt-2 space-y-2">
          {[
            {
              name: "Implement dashboard layout",
              priority: "High",
              status: "In Progress",
              created: "2025-12-17",
            },
            {
              name: "Fix sidebar responsive issue",
              priority: "Medium",
              status: "Pending",
              created: "2025-12-16",
            },
            {
              name: "Add Recent Tasks table",
              priority: "Low",
              status: "Completed",
              created: "2025-12-15",
            },
          ].map((task, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr] gap-4 p-2 bg-white rounded-md shadow hover:bg-gray-50 transition"
            >
              <div className="font-medium">{task.name}</div>
              <div>{task.priority}</div>
              <div>{task.status}</div>
              <div>{task.created}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
