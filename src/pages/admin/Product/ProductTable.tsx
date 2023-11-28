import { NavLink } from "react-router-dom";
import { IProduct } from "../../../types/interfaces";

export default function ProductTable({
  products,
}: {
  products: IProduct[] | null;
}) {
  return !products ? (
    <p>Loading Products</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Enabled</th>
          <th>Description</th>
          <th>Supplier</th>
          <th>Tags</th>
          <th>Base Price</th>
          <th>Active Discounts</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product._id}</td>
            <td>
              {product.images?.length ? (
                <img src={product.images[0] as string} />
              ) : (
                <NavLink to={`/admin/products/${product._id}/edit`}>
                  Add Image
                </NavLink>
              )}
            </td>
            <td>{product.name}</td>
            <td>{product.isEnabled ? "Yes" : "No"}</td>
            <td>{product.description}</td>
            <td>{product.supplier!.companyName}</td>
            <td>{product.tags.join(", ")}</td>
            <td>{product.basePrice}</td>
            <td>
              {product.activeDiscounts
                ? product.activeDiscounts.join(", ")
                : "None"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
