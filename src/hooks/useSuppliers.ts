import { ISupplier } from "../types/interfaces";
import useAuth from "./useAuth";

export default function useSuppliers() {
  const { headers } = useAuth();
  const getSuppliers = async () => {
    const res = await fetch("http://localhost:3030/api/v1/suppliers/", {
      method: "GET",
      headers,
    });
    if (res.ok) {
      return (await res.json()).suppliers as ISupplier[];
    } else {
      const data = await res.json();
      throw new Error(data.messege);
    }
  };
  return { getSuppliers };
}
