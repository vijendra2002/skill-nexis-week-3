import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <Link className="brand" to={user ? "/dashboard" : "/login"}>
        Task<span>Manager</span>
      </Link>

      {user && (
        <nav className="nav-links">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <button className="button ghost" onClick={logout}>Logout</button>
        </nav>
      )}
    </header>
  );
}
