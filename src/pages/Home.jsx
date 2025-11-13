import { useEffect, useState } from "react";
import { getCategories, getProducts } from "../api/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("All");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
    getProducts("").then((res) => setProducts(res.data));
  }, []);

  const handleAddToCart = (p) => {
    setCart([...cart, p]);
    localStorage.setItem("cart", JSON.stringify([...cart, p]));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 font-bold">Categories</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c._id}
            onClick={() => {
              setSelected(c.name);
              getProducts(c.name).then((res) => setProducts(res.data));
            }}
            className={`px-3 py-1 rounded ${selected === c.name ? "bg-green-600 text-white" : "bg-gray-200"}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <h2 className="text-2xl mt-6 mb-3 font-bold">{selected} Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onAdd={handleAddToCart} />
        ))}
      </div>
    </div>
  );
}
