import { mutate } from "swr";

export const useLogout = () => {
  const logout = async () => {
    const backendUrl = "http://localhost:5000";
    if (!backendUrl) {
      console.error("BACKEND URL is not defined");
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/api/v1/logout`, {
        method: "POST",
        credentials: "include", 
      });

      if (!res.ok) {
        console.error("Logout failed");
        return;
      }

      mutate(`${backendUrl}/api/users/data`, null, { revalidate: false });
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return logout;
};
