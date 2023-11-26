// pages/Admin/NewProductPage.js

import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import ProductService from "../../services/Products";
import SupplierService from "../../services/Suppliers";
import Errors from "../../services/Errors";
import { useNavigate } from "react-router-dom";
import { IProduct, ISupplier } from "../../types/interfaces";
import DiscountSelector from "../../components/admin/DiscountSelector";

export default function NewProduct() {
  const [newProduct, setNewProduct] = useState<IProduct>({
    isEnabled: false,
    name: "",
    description: "",
    supplier: null,
    tags: [],
    basePrice: 0,
  });
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    SupplierService.getSuppliers()
      .then((res) =>
        res.suppliers ? setSuppliers(res.suppliers) : alert(res.messege)
      )
      .catch((e) => errorHandler(e));
  }, []);

  const errorHandler = (e: Error) => {
    if (e instanceof Errors.TokenExpiredError) {
      navigate("/user/login");
    } else {
      alert(e.message);
    }
  };
  const handleInputChange: ChangeEventHandler = (e) => {
    const { name, value } = e.target as HTMLInputElement;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleCheckboxChange: ChangeEventHandler = (e) => {
    const { name, checked } = e.target as HTMLInputElement;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: checked,
    }));
  };
  const handleTagsChange: ChangeEventHandler = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    const tagsArray = value.split(",").map((tag) => tag.trim());
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      tags: tagsArray,
    }));
  };
  const handleSave: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      e.preventDefault();
      await ProductService.createProduct(newProduct);
      alert(`The product ${newProduct.name} was added successfully!`);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving new product:", error);
    }
  };

  return (
    <div>
      <h1>New Product</h1>
      <form>
        <div>
          <label htmlFor="enabled">Enabled:</label>
          <input
            type="checkbox"
            id="enabled"
            name="enabled"
            checked={newProduct.isEnabled}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="supplier">Supplier:</label>
          <select
            id="supplier"
            name="supplier"
            value={newProduct.supplier ? newProduct.supplier._id : ""}
            onChange={handleInputChange}
          >
            {suppliers.map((s) => (
              <option value={s._id}>{s.companyName}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tags">Tags (comma-separated):</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={newProduct.tags.join(",")}
            onChange={handleTagsChange}
          />
        </div>
        <div>
          <label htmlFor="basePrice">Base Price:</label>

          <input
            type="number"
            id="basePrice"
            name="basePrice"
            value={newProduct.basePrice}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="activeDiscounts">Active Discounts:</label>
          { newProduct.activeDiscounts ? 
          <input
            type="text"
            id="activeDiscounts"
            name="activeDiscounts"
            value={newProduct.activeDiscounts.join(",")}
            onChange={handleInputChange}
          /> : <DiscountSelector />}
        </div>
        <button className="btn btn-primary" type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
}
