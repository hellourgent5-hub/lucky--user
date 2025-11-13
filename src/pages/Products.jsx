import { useEffect, useState } from "react";
import { getProducts } from "../api/api";
import ProductCard from "../components/ProductCard";

export default function Products(){
  const [products, setProducts] = useState([]);
  useEffect(()=>{ getProducts().then(r=>setProducts(r.data)).catch(()=>setProducts([])); },[]);
  return (
    <div className="container">
      <h1>Products</h1>
      <div className="grid" style={{marginTop:10}}>
        {products.map(p=> <ProductCard key={p._id} p={p} />)}
      </div>
    </div>
  );
}
