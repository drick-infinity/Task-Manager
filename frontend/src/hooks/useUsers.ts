// hooks/useUsers.ts
import useSWR from 'swr';

const USERS_URL = 'http://localhost:5000/api/users/allusers'; // Replace with your actual users API endpoint

const fetcher = async (url: string) => {
  const token = localStorage.getItem('token');
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json(); // Assuming the API returns { success: true, data: [...users] }
};

export const useUsers = () => {
  const { data, error } = useSWR(USERS_URL, fetcher);

  // Check if 'data' exists and is an array before trying to reduce
  const usersById = Array.isArray(data?.data)
    ? data.data.reduce((acc: Record<number, any>, user: any) => {
        acc[user.id] = user; // Map the user object by their id
        return acc;
      }, {})
    : {}; // Return an empty object if data is not an array

  return {
    usersById,
    isLoading: !data && !error,
    isError: error,
  };
};
