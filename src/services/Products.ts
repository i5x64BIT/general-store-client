const createProduct = async (formData: FormData) => {
  const res = await fetch("http://localhost:3030/api/v1/product/", {
    method: "POST",
    credentials: "include",
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
  const res = await fetch("http://localhost:3030/api/v1/products");
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("products", JSON.stringify(data));
    return data;
  } else {
    throw new Error(data.messege);
  }
};
export { createProduct, getProducts };
