import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css"; // Import your CSS file for styling
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
      <Link to="/" className="title">
        FoodieFoo
      </Link>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <FaSearch size="1.6em" color="black" />
      </div>
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
