import { useEffect, useState } from "react";
import { getUserOrders } from "../api/api";

export default function Orders(){
  const [orders,setOrders] = useState([]);
  useEffect(()=>{
    getUserOrders().then(r=>setOrders(r.data)).catch(()=>setOrders([]));
  },[]);
  return (
    <div className="container">
      <h1>My Orders</h1>
      {orders.length===0 ? <p>No orders found.</p> : orders.map(o=>(
        <div key={o._id} className="card" style={{marginBottom:10}}>
          <p><strong>Order ID:</strong> {o._id}</p>
          <p className="small"><strong>Status:</strong> {o.status || "pending"}</p>
          <div style={{marginTop:8}}>
            {o.products?.map((p,idx)=>(
              <div key={idx} className="small">{p.productId?.name || p.productId} x {p.quantity}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
