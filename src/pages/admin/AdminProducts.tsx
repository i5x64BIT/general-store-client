import { useEffect, useState } from "react";
import { IProduct } from "../../types/interfaces";
import ProductTable from "./ProductTable";

export default function Products() {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3030/api/v1/products", { mode: 'cors'});
      const data: IProduct[] = await res.json();
      setProducts(data);
    })();
  }, []);

  return (
    <main className="products">
      <a href="/admin/product/new">New Product</a>
      <ProductTable products={products} />
    </main>
  );
}
