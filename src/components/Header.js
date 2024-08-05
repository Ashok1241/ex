import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    const isAuthenticated = localStorage.getItem("authenticated"); // Replace with your authentication check
    if (!isAuthenticated) {
      navigate("/Register");
    } else {
      navigate("/search");
    }
  };

  const handleProfileClick = () => {
    const isAuthenticated = localStorage.getItem("authenticated"); // Replace with your authentication check
    if (!isAuthenticated) {
      navigate("/Register"); // Redirect to Register page if not authenticated
    } else {
      navigate("/profile"); // Redirect to Profile page if authenticated
    }
  };

  return (
    <div className="home-container">
      <div className="top-buttons">
        <button className="top-button" onClick={() => navigate("/Register")}>
          Sign Up
        </button>
        <button className="top-button" onClick={() => navigate("/login")}>
          Login
        </button>
        <button
          className="top-button"
          onClick={() => navigate("/Registerasworker")}
        >
          Register As Worker
        </button>
        <button className="top-button">Learn More</button>
        <button className="top-button" onClick={handleProfileClick}>
          Profile
        </button>
      </div>
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to Our Service</h1>
          <p>Your one-stop solution for all your needs.</p>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
