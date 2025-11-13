import { useEffect, useState } from "react";
import { getServices } from "../api/api";

export default function Services(){
  const [services, setServices] = useState([]);
  useEffect(()=>{ getServices().then(r=>setServices(r.data)).catch(()=>setServices([])); },[]);
  return (
    <div className="container">
      <h1>Services</h1>
      <div className="grid" style={{marginTop:10}}>
        {services.map(s=>(
          <div key={s._id} className="card">
            <img src={s.image||"https://via.placeholder.com/300x200"} alt={s.name} style={{width:"100%",height:120,objectFit:"cover",borderRadius:6}}/>
            <h3 style={{marginTop:8}}>{s.name}</h3>
            <p className="small">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
