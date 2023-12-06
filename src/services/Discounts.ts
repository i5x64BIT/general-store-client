const DiscountService = {
  getDiscounts: async () => {
    const res = await fetch("http://localhost:3030/api/v1/discounts/", {
      method: "PUT",
      credentials: "include",
    });
    if (res.ok) {
      return await res.json();
    } else {
      const data = await res.json();
      throw new Error(data.messege);
    }
  },
};

export default DiscountService;
