import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLogout } from "../../hooks/useLogout";
const Sidebar: React.FC = () => {
  const location = useLocation();

  const linkClasses =
    "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors";

  const isActive = (path: string) =>
    location.pathname === path ? "bg-gray-700" : "hover:bg-gray-700";
  const { data, isLoading, isError } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Not logged in</div>;

  const user = data.data;
  const logout = useLogout();
  return (
    <aside className="w-64 min-h-screen bg-[#00246B] text-white hidden md:block">
      <div className="p-4 space-y-2">
      <div className="flex items-center gap-3 mb-4">
      <img
        src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name}`}
        alt={user.name}
        className="w-10 h-10 rounded-full"
      />
      <span>{user.name}</span>
    </div>
        <a
          href="/dashboard"
          className={`${linkClasses} ${isActive("/dashboard")}`}
        >
          Dashboard
        </a>

        <a
          href="/create-task"
          className={`${linkClasses} ${isActive("/create-task")}`}
        >
          Create Task
        </a>
        <a
          href="/assigned-task"
          className={`${linkClasses} ${isActive("/manage-task")}`}
        >
          Assigned Task
        </a>


        <a
          href="/overdue-task"
          className={`${linkClasses} ${isActive("/overdue-task")}`}
        >
          OverDue Task
        </a>

        <hr className="border-gray-700 my-3" />

        <button
          className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-gray-700 w-full"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
