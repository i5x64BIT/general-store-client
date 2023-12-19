import { useEffect, useState } from "react";
import EditTable from "../../components/admin/EditTable";
import useUsers from "../../hooks/useUsers";

export default function AdminUsers() {
  const [users, setUsers] = useState();
  const { getUsers } = useUsers();
  useEffect(() => {
    getUsers().then((u) => setUsers(u));
  }, []);
  return users ? <EditTable items={users} /> : <p>Loading Users...</p>;
}
