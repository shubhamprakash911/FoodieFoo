import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css"; // Import your CSS file for styling
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ setSearch, showSearch = true, isLogin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSearch(query);
  }

  return (
    <nav>
      <Link to="/" className="title">
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
          <NavLink to="/favourite">Favourite</NavLink>
        </li>
        <li>
          <NavLink to="/Login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup">SignUp</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
