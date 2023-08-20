import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css"; // Import your CSS file for styling
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ setSearch, showSearch = true, isLogin, setIsLogin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setSearch(query);
  }

  function handleLogout() {
    localStorage.removeItem("userLogin");
    setIsLogin(null);
    navigate("/", { replace: true });
  }

  return (
    <nav>
      <Link to="/" onClick={() => setSearch("")} className="title">
        FoodieFoo
      </Link>
      {showSearch && (
        <form onSubmit={handleSubmit}>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <FaSearch size="1.6em" color="black" onClick={handleSubmit} />
          </div>
        </form>
      )}
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink className="link" to="/favourite">
            Favourite
          </NavLink>
        </li>
        {isLogin ? (
          <>
            <li>
              <span className="link active">{isLogin.username}</span>
            </li>
            <li>
              <span className="link" onClick={handleLogout}>
                Logout
              </span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink className="link" to="/Login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className="link" to="/signup">
                SignUp
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
