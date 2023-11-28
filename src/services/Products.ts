
const createProduct = async (formData: FormData) => {
  const res = await fetch("http://localhost:3030/api/v1/product/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData
  });
  if (res.ok) {
    return "Product added successfully";
  } else {
    const data = await res.json();
    throw new Error(data.messege);
  }
};

export default { createProduct };
