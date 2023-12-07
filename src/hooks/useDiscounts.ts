export default function useDiscounts() {
  const getDiscounts = async () => {
    const res = await fetch("http://localhost:3030/api/v1/discounts/", {
      method: "PUT",
    });
    if (res.ok) {
      return await res.json();
    } else {
      const data = await res.json();
      throw new Error(data.messege);
    }
  };
  return { getDiscounts };
}
