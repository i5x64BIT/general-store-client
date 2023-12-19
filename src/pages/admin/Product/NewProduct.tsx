// pages/Admin/NewProductPage.js

import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Errors from "../../../services/Errors";
import { useNavigate } from "react-router-dom";
import { IProduct, ISupplier } from "../../../types/interfaces";
import DiscountSelector from "../../../components/admin/DiscountSelector";
import useSuppliers from "../../../hooks/useSuppliers";
import useProducts from "../../../hooks/useProducts";

export default function NewProduct() {
  const savedProduct = localStorage.getItem("newProduct");
  const productSchema = {
    isEnabled: false,
    name: "",
    description: "",
    supplier: null,
    tags: [],
    basePrice: 0,
  };
  const [newProduct, setNewProduct] = useState<IProduct>(
    savedProduct ? JSON.parse(savedProduct) : productSchema
  );
  const [images, setImages] = useState<File[]>([]);
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const { getSuppliers } = useSuppliers();
  const { createProduct } = useProducts();
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("newProduct", JSON.stringify(newProduct));
  }, [newProduct]);
  const imageHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = [];
    if (e.target.files?.length) {
      (async () => {
        for (let i of e.target.files!) {
          files.push(i);
        }
        setImages(files);
      })();
    }
  };
  useEffect(() => {
    getSuppliers()
      .then((suppliers) =>
        suppliers ? setSuppliers(suppliers) : alert(suppliers)
      )
      .catch((e) =>
        e instanceof Errors.TokenExpiredError
          ? navigate("/user/login")
          : alert(e.message)
      );
  }, []);

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
      const fd = new FormData();

      fd.append("product", JSON.stringify(newProduct));
      for (let i of images) {
        fd.append("images", i);
      }

      await createProduct(fd);
      alert(`The product ${newProduct.name} was added successfully!`);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving new product:", error);
    }
  };
  const handleReset = () => {
    localStorage.removeItem("newProduct");
  };
  return (
    <div>
      <h1>New Product</h1>
      <form ref={formRef}>
        <div>
          <label>
            Upload An Image
            <input
              type="file"
              name="image"
              accept=".jpg, .jpeg, .png"
              multiple
              onChange={imageHandler}
            />
          </label>
        </div>
        <div>
          <label htmlFor="enabled">Enabled:</label>
          <input
            type="checkbox"
            id="enabled"
            name="isEnabled"
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
            <option disabled={newProduct.supplier ? true : false}>-</option>
            {suppliers.map((s) => (
              <option key={s._id} value={s._id}>
                {s.companyName}
              </option>
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
          {newProduct.activeDiscounts ? (
            <input
              type="text"
              id="activeDiscounts"
              name="activeDiscounts"
              value={newProduct.activeDiscounts.join(",")}
              onChange={handleInputChange}
            />
          ) : (
            <DiscountSelector />
          )}
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
        <button className="btn" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
}
