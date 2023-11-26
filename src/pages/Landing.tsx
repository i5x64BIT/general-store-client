import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./Landing.scss";
import { IProduct } from "../types/interfaces";

export default function Landing() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3030/api/v1/products");
      const data = await res.json();
      if (res.ok) {
        setProducts(data);
      } else {
        alert(data.messege);
      }
    })();
  }, []);

  const items = products.map((p) => (
    <div className="product">
      <img src={p.images![1]} />
      <p>{p.name}</p>
      <p>{p.basePrice}</p>
    </div>
  ));
  return (
    <div className="landin-container">
      <Header />
      <section className="hero">
        <div>
          <h1>Unlock a world of possibilities.</h1>
          <h2>
            Wherever you are, our store is dedicated to providing superior
            quality goods that transcend borders, bringing the best to you, no
            matter the distance.
          </h2>
          <a className="btn btn-primary" href="#products">
            Browse Products
          </a>
        </div>
        <div>
          {products.length ? (
            <img
              src={products[0].images![1]}
              alt={products[0].name.toString()}
            />
          ) : (
            <img />
          )}
        </div>
      </section>
      <section id="#products">
        <p>{items || "Loadin Products..."}</p>
      </section>
    </div>
  );
}
