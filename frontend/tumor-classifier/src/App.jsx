import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import PredictionResult from "./Components/PredictionResult/PredictionResult";
import ImageUpload from "./Components/ImageUpload/ImageUpload";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import SetPassword from "./Components/SetPassword/SetPassword";
import Faq from "./Components/FAQ/Faq";
import PredictionHistory from "./Components/PredictionHistory/PredictionHistory";

// ✅ This component is rendered inside <Router>, so useNavigate works here
const AppContent = ({ image, setImage, result, setResult, predictionId, setPredictionId, isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageSubmit = async () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch("http://localhost:8000/api/predict/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
        navigate("/login");
        return;
      }

      const data = await response.json();
      setResult(data.prediction);
      setPredictionId(data.id); // Save the prediction ID
      navigate("/result");
    } catch (error) {
      console.error("Prediction error:", error);
      setResult("Prediction failed. Please try again.");
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/forget_password" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/setpassword" element={<SetPassword />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/history" element={<PredictionHistory />} />
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/upload"
          element={
            <ImageUpload
              onImageChange={handleImageChange}
              onSubmit={handleImageSubmit}
            />
          }
        />
        <Route path="/result" element={<PredictionResult result={result} predictionId={predictionId} />} />
      </Route>
    </Routes>
  );
};

// ✅ Final App component
const App = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [predictionId, setPredictionId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <AppContent
        image={image}
        setImage={setImage}
        result={result}
        setResult={setResult}
        predictionId={predictionId}
        setPredictionId={setPredictionId}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </Router>
  );
};

export default App;
