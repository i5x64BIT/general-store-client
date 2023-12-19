import { useEffect, useState } from "react";
import useSuppliers from "../../hooks/useSuppliers";
import { ISupplier } from "../../types/interfaces";
import EditTable from "../../components/admin/EditTable";
import useUsers from "../../hooks/useUsers";

export default function AdminSuppliers() {
  const [suppliers, setSuppliers] = useState<ISupplier[] | null>(null);
  const { getSuppliers } = useSuppliers();
  const { getUsers } = useUsers();

  useEffect(() => {
    getSuppliers().then((data) => setSuppliers(data));
  }, []);

  return suppliers ? (
    <EditTable
      items={suppliers}
      matcherObject={{
        contact: {
          fetchCallback: getUsers,
          fieldNameInNested: "email",
        },
      }}
    />
  ) : (
    <p>Loading Suppliers...</p>
  );
}
