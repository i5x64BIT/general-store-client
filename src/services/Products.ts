import { IProduct } from "../types/interfaces";

const createProduct = async (product: IProduct) => {
  const res = await fetch("http://localhost:3030/api/v1/product/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
      product,
    }),
  });
  if (res.ok) {
    return "Product added successfully";
  } else {
    const data = await res.json();
    throw new Error(data.messege);
  }
};

export default { createProduct };
