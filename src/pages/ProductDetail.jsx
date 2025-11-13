import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/api";

export default function ProductDetail(){
  const { id } = useParams();
  const [p, setP] = useState(null);
  useEffect(()=>{ getProductById(id).then(r=>setP(r.data)).catch(()=>setP(null)); },[id]);
  if(!p) return <div className="container"><p>Loading...</p></div>;
  return (
    <div className="container">
      <div className="card">
        <img src={p.image||"https://via.placeholder.com/600x400"} alt={p.name} style={{width:"100%",height:320,objectFit:"cover",borderRadius:6}}/>
        <h2 style={{marginTop:12}}>{p.name}</h2>
        <p className="small">₹{p.price}</p>
        <p style={{marginTop:8}}>{p.description}</p>
        <button className="button" style={{marginTop:12}} onClick={()=>{
          const cart = JSON.parse(localStorage.getItem("cart")||"[]");
          cart.push({ productId: p._id, name: p.name, price: p.price, qty:1 });
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("Added to cart");
        }}>Add to cart</button>
      </div>
    </div>
  );
}
