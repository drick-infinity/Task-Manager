import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
};

export const useAuth = () => {
  const { data, error, isLoading } = useSWR("http://localhost:5000/api/users/data", fetcher);

  return {
    data,
    isLoading,
    isError: !!error,
  };
};
