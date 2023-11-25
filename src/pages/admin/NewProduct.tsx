// pages/Admin/NewProductPage.js

import { EventHandler, FormEvent, useEffect, useState } from "react";
import Products from "../../services/Products";
import SupplierService from "../../services/Suppliers";
import Errors from "../../services/Errors";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const [newProduct, setNewProduct] = useState({
    enabled: true,
    name: "",
    description: "",
    supplier: "",
    tags: [],
    basePrice: 0,
    activeDiscounts: [],
  });
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const errorHandler = (e: Error) => {
    if (e instanceof Errors.TokenExpiredError) {
      navigate("/user/login");
    } else {
      alert(e.message);
    }
  };
  useEffect(() => {
    SupplierService.getSuppliers()
      .then((res) =>
        res.suppliers ? setSuppliers(res.suppliers) : alert(res.messege)
      )
      .catch((e) => errorHandler(e));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: checked,
    }));
  };

  const handleTagsChange = (e) => {
    const { value } = e.target;
    const tagsArray = value.split(",").map((tag) => tag.trim());
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      tags: tagsArray,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await Products.createProduct(newProduct);
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
            checked={newProduct.enabled}
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
            value={newProduct.supplier}
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
          <input
            type="text"
            id="activeDiscounts"
            name="activeDiscounts"
            value={newProduct.activeDiscounts.join(",")}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-primary" type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
}
