import Errors from "./Errors";

const getSuppliers = async () => {
  const res = await fetch("http://localhost:3030/api/v1/suppliers/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const data = await res.json();
    throw new Errors.TokenExpiredError(data.messege);
  }
};

export default { getSuppliers };
