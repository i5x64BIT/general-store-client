import useAuth from "./useAuth";

export default function useUsers() {
  const { headers } = useAuth();
  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:3030/api/v1/users", {
        headers,
      });
      if (res.ok) {
        return await res.json();
      } else {
        const { messege } = await res.json();
        throw new Error(messege);
      }
    } catch (error) {
      throw error;
    }
  };
  return { getUsers };
}
