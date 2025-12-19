import useSWR from "swr";

export interface User {
  id: number;
  name: string;
  email: string;
}

const USERS_URL = "http://localhost:5000/api/users/allusers";

const fetcher = async (url: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json() as Promise<{ success: boolean; data: User[] }>;
};

export const useUsers = () => {
  const { data, error } = useSWR<{ success: boolean; data: User[] }>(USERS_URL, fetcher);

  const usersById: Record<number, User> = Array.isArray(data?.data)
    ? data.data.reduce((acc: Record<number, User>, user: User) => {
        acc[user.id] = user;
        return acc;
      }, {})
    : {};

  return {
    usersById,
    isLoading: !data && !error,
    isError: error,
  };
};
