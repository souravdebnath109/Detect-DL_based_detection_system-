import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import DownloadReport from "../DownloadReport/DownloadReport";;
 // ⬅️ Add this

const Navbar = () => {
  return (
    <nav className="custom-navbar">
      <div className="logo">Dtect +</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/faq">Faqs</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/upload">Upload</Link></li>
        {/* <li><Link to="/predict">Result</Link></li> */}
        <li><Link to="/history">History</Link></li>
              </ul>
    </nav>
  );
};

export default Navbar;
