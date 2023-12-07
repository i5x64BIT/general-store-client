import { useEffect, useState } from "react";
import { IProduct } from "../../../types/interfaces";
import ProductTable from "./ProductTable";
import useProducts from "../../../hooks/useProducts";

export default function Products() {
  const prevProducts = localStorage.getItem("products");
  const [products, setProducts] = useState<IProduct[]>(
    prevProducts ? JSON.parse(prevProducts) : []
  );
  const { getProducts } = useProducts();
  useEffect(() => {
    const localProducts = localStorage.getItem("products");
    localProducts
      ? setProducts(JSON.parse(localProducts))
      : getProducts().then((p) => setProducts(p));
  }, []);

  return (
    <main className="products">
      <a href="/admin/product/new">New Product</a>
      <ProductTable products={products} />
    </main>
  );
}
