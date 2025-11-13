import { useState } from "react";
import { userRegister } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const navigate=useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    try{
      await userRegister({ name, email, password });
      alert("Registered. Please login.");
      navigate("/login");
    }catch(err){ console.error(err); alert(err.response?.data?.message || "Register failed"); }
  };

  return (
    <div className="container" style={{maxWidth:420}}>
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={submit}>
          <input className="input" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
          <div style={{height:8}} />
          <input className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <div style={{height:8}} />
          <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <div style={{height:12}}/>
          <button className="button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
