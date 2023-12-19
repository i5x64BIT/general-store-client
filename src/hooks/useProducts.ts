import useAuth from "./useAuth";

export default function useProducts() {
  const { token, headers } = useAuth();

  const createProduct = async (formData: FormData) => {
    const res = await fetch("http://localhost:3030/api/v1/product/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (res.ok) {
      return true;
    } else {
      const data = await res.json();
      throw new Error(data.messege);
    }
  };
  const getProducts = async (offset?: number) => {
    const res = await fetch(
      `http://localhost:3030/api/v1/products/${
        offset ? `?offset=${offset}` : ""
      }`,
      {
        headers,
      }
    );
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.messege);
    }
  };
  return { createProduct, getProducts };
}
