import useSWR, { mutate as swrMutate } from "swr";

const TASKS_URL = "http://localhost:5000/api/task/tasks";

const taskFetcher = async (url: string) => {
  const res = await fetch(url, { credentials: "include" });

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const json = await res.json();
  return json.data;
};

export const useTasks = () => {
  const { data, error, isLoading } = useSWR(TASKS_URL, taskFetcher);

  return {
    tasks: data ?? [],
    isLoading,
    isError: Boolean(error),
  };
};
export const mutate = () => swrMutate(TASKS_URL);
