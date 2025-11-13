import { useState } from "react";
import { userLogin } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const navigate = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    try{
      const res = await userLogin({ email, password });
      localStorage.setItem("userToken", res.data.token);
      alert("Login successful");
      navigate("/");
    }catch(err){
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container" style={{maxWidth:420}}>
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <input className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <div style={{height:8}}/>
          <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <div style={{height:12}}/>
          <button className="button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
