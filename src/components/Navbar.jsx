import { Link, useNavigate } from "react-router-dom";

export default function Navbar(){
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  const logout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };
  return (
    <header className="container header">
      <div>
        <Link to="/"><strong>Lucky Marketplace</strong></Link>
      </div>
      <nav className="nav-links">
        <Link to="/services">Services</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        {token ? (
          <>
            <Link to="/orders">My Orders</Link>
            <a onClick={logout} style={{cursor:"pointer", marginLeft:12}}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" style={{marginLeft:8}}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
