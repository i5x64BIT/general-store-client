import useAuth from "./useAuth";

export default function useProducts() {
  const createProduct = async (formData: FormData) => {
    const { token } = useAuth();
    const res = await fetch("http://localhost:3030/api/v1/product/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (res.ok) {
      return "Product added successfully";
    } else {
      const data = await res.json();
      throw new Error(data.messege);
    }
  };
  const getProducts = async () => {
    const { headers } = useAuth();
    const res = await fetch("http://localhost:3030/api/v1/products", {
      headers,
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("products", JSON.stringify(data));
      return data;
    } else {
      throw new Error(data.messege);
    }
  };
  return { createProduct, getProducts };
}
