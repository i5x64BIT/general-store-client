import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./Landing.scss";
import { IProduct } from "../types/interfaces";
import useProducts from "../hooks/useProducts";
("../services/Products");

export default function Landing() {
  const { getProducts } = useProducts();
  const [products, setProducts] = useState<IProduct[] | null>(null);
  useEffect(() => {
    getProducts().then((p) => {
      setProducts(p);
    });
  }, []);

  if (products) {
    const items = products.map((p) => (
      <div className="product">
        <img
          src={p.images ? (p.images[0] as string) : "../../public/vite.svg"}
        />
        <p>{p.name}</p>
        <p>{p.basePrice}</p>
      </div>
    ));
    return (
      <div className="landing-container">
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
              // TODO ProductCards
              <img
                src={
                  products[0].images
                    ? (products[0].images![0] as string)
                    : "../../public/vite.svg"
                }
              />
            ) : (
              <img />
            )}
          </div>
        </section>
        <section id="#products">
          <p>{items || "Loading Products..."}</p>
        </section>
      </div>
    );
  } else
    return (
      <>
        <Header />
        <p>Loading Page...</p>
      </>
    );
}
