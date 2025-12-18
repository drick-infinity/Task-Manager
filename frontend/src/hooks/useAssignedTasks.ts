// hooks/useAssignedTasks.ts
import useSWR from "swr";

const ASSIGNED_TASKS_URL = "http://localhost:5000/api/task/assigned"; // backend endpoint

const fetcher = async (url: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch assigned tasks");
    }
  
    const data = await res.json();
    return data.tasks || []; // <-- only return the array
  };
  
  export const useAssignedTasks = () => {
    const { data, error, isLoading, mutate } = useSWR(ASSIGNED_TASKS_URL, fetcher);
  
    return {
      assignedTasks: data || [], // now this is guaranteed to be an array
      isLoading,
      isError: error,
      mutate,
    };
  };
  