import { useEffect, useState } from "react";
import { getServices } from "../api/api";
import { Link } from "react-router-dom";

export default function Home(){
  const [services, setServices] = useState([]);
  useEffect(()=>{ getServices().then(r=>setServices(r.data)).catch(()=>setServices([])); },[]);
  return (
    <div className="container">
      <div className="card" style={{padding:18}}>
        <h1>Welcome to Lucky Marketplace</h1>
        <p className="small">Shop groceries, food, pharmacy & parcels.</p>
        <Link to="/services" className="button" style={{marginTop:12}}>Explore Services</Link>
      </div>

      <h2 style={{marginTop:18}}>Top Services</h2>
      <div className="grid" style={{marginTop:10}}>
        {services.map(s=>(
          <div key={s._id} className="card">
            <img src={s.image||"https://via.placeholder.com/300x200"} alt={s.name} style={{width:"100%",height:120,objectFit:"cover",borderRadius:6}}/>
            <h3 style={{marginTop:8}}>{s.name}</h3>
            <p className="small">{s.description}</p>
            <div style={{marginTop:8}}>
              <Link to="/products" className="small">View products</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
