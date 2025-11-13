import { useState, useEffect } from "react";
import { createOrder } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Cart(){
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  useEffect(()=> setCart(JSON.parse(localStorage.getItem("cart")||"[]")),[]);
  const remove = (i)=>{ const c=[...cart]; c.splice(i,1); setCart(c); localStorage.setItem("cart", JSON.stringify(c)); };
  const placeOrder = async ()=>{
    const token = localStorage.getItem("userToken");
    if(!token){ alert("Please login to place order"); navigate("/login"); return; }
    try{
      // send order per backend schema - adjust if backend expects different shape
      const items = cart.map(it=>({ productId: it.productId, quantity: it.qty }));
      await createOrder({ items });
      localStorage.setItem("cart","[]");
      setCart([]);
      alert("Order placed");
      navigate("/orders");
    }catch(e){ console.error(e); alert("Order failed"); }
  };
  return (
    <div className="container">
      <h1>Cart</h1>
      <div>
        {cart.length===0 ? <p>No items in cart.</p> : cart.map((it,idx)=>(
          <div key={idx} className="card" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div>
              <strong>{it.name}</strong>
              <p className="small">₹{it.price} x {it.qty}</p>
            </div>
            <div>
              <button onClick={()=>remove(idx)} style={{marginRight:8}}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      {cart.length>0 && <button className="button" onClick={placeOrder}>Place Order</button>}
    </div>
  );
}
