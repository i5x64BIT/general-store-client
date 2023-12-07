import { ChangeEventHandler, useEffect, useState } from "react";
import { IDiscount } from "../../types/interfaces";
import useDiscounts from "../../hooks/useDiscounts";

export default function DiscountSelector() {
  const [discounts, setDiscounts] = useState<IDiscount[]>([]);
  const [newDiscount, setNewDiscount] = useState({});
  const { getDiscounts } = useDiscounts();
  useEffect(() => {
    getDiscounts().then((data) => setDiscounts(data));
  }, []);

  const changeHandler: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = (e) => {
    setNewDiscount((prevDiscount) => ({
      ...prevDiscount,
      [e.target.name]: e.target.value,
    }));
  };

  return discounts ? (
    <button>Add Discount</button>
  ) : (
    <div className="discount-selector-container">
      <form>
        <legend>New Discount</legend>
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={changeHandler}
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={changeHandler}
        ></textarea>
        <input
          name="products"
          type="text"
          placeholder="Products List"
          onChange={changeHandler}
        />{" "}
        {/* TODO change to ProductList component*/}
        <div>
          <select name="discountType" onChange={changeHandler}>
            <option value="percentege">Percentege</option>
            <option value="fixed_price">Fixed Price</option>
          </select>
          <input
            type="number"
            name="discountValue"
            placeholder="Discount Value"
            onChange={changeHandler}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            //TODO create new discount
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
