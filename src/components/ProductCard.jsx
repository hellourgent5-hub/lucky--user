import { Link } from "react-router-dom";

export default function ProductCard({ p }){
  return (
    <div className="card">
      <img src={p.image || "https://via.placeholder.com/300x200"} alt={p.name} style={{width:"100%", height:140, objectFit:"cover", borderRadius:6}}/>
      <h3 style={{marginTop:8}}>{p.name}</h3>
      <p className="small">₹{p.price}</p>
      <div style={{marginTop:8, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <Link to={`/product/${p._id}`} className="small">View</Link>
        <span className="button" onClick={()=>{
          const cart = JSON.parse(localStorage.getItem("cart")||"[]");
          cart.push({ productId: p._id, name: p.name, price: p.price, qty: 1 });
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("Added to cart");
        }}>Add</span>
      </div>
    </div>
  );
}
