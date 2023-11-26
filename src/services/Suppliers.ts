import Errors from "./Errors";

const getSuppliers = async () => {
  const res = await fetch("http://localhost:3030/api/v1/suppliers/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (res.ok) {
    return await res.json();
  } else {
    const data = await res.json();
    if (data.messege === "Token Expired") {
      throw new Errors.TokenExpiredError(data.messege);
    } else throw new Error(data.messege);
  }
};

export default { getSuppliers };
