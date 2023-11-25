import { useState } from "react";
import { IProduct } from "../../types/interfaces";

export default function ({ product }: { product: IProduct }) {
  const [newProduct, setNewProduct] = useState<IProduct | any>(
    product
  );
  const inputField = (type: string, placeholder: string, key: string) => {
    return newProduct && newProduct[key] ? (
      newProduct[key]
    ) : (
      <input
        placeholder={placeholder}
        type={type}
        onChange={(e) =>
          setNewProduct({ ...newProduct, [key]: e.target.value })
        }
      />
    );
  };
  return (
    <>
      <h2>{inputField("text", "Product Name", "name")}</h2>
      <div></div>
    </>
  );
}
