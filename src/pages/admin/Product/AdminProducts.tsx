import { useEffect, useState } from "react";
import { IProduct } from "../../../types/interfaces";
import useProducts from "../../../hooks/useProducts";
import EditTable from "../../../components/admin/EditTable";
import useSuppliers from "../../../hooks/useSuppliers";

export default function Products() {
  const { getProducts } = useProducts();
  const { getSuppliers } = useSuppliers();
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getProducts(offset).then((p) => {
      setProducts(p);
    });
  }, [offset]);

  return products ? (
    <main className="products">
      <a href="/admin/product/new">New Product</a>
      <EditTable
        items={products}
        matcherObject={{
          supplier: {
            fetchCallback: getSuppliers,
            fieldNameInNested: "companyName",
          },
        }}
      />

      <button
        onClick={() => setOffset(offset - 10)}
        disabled={!offset || !products ? true : false}
      >
        Back
      </button>
      <button
        onClick={() => setOffset(offset + 10)}
        disabled={products.length < 10 ? true : false}
      >
        Next
      </button>
    </main>
  ) : (
    <p>Loading Products...</p>
  );
}
