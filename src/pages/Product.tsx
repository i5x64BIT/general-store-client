import { IProduct } from "../types/interfaces";

export default function ({ product }: { product: IProduct }) {
  return <p>{JSON.stringify(product)}</p>;
}
