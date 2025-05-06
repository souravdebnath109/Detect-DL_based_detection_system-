// Components/Home/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import hospitalImage from "../../assets/news-image1.jpg";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="hero-section">
        <div className="hero-text">
          <h1 className="engineer-text">👨‍⚕️ Brain Tumor Detection System</h1>
          <h2 className="name-text">AI-Powered Diagnostic Tool</h2>
          <p>
            Upload your brain MRI scan and let our AI model help with accurate
            tumor prediction and analysis. Trusted by doctors. Backed by deep learning.
          </p>
          <Link to="/upload">
            <button className="upload-button">Upload Image</button>
          </Link>
        </div>
        <div className="hero-image">
          <img src={hospitalImage} alt="Hospital Treatment" />
        </div>
      </div>
    </div>
  );
};

export default Home;
