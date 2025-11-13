import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("userToken");
  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Lucky Marketplace</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        {token ? (
          <>
            <Link to="/cart">Cart</Link>
            <button
              onClick={() => {
                localStorage.removeItem("userToken");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
