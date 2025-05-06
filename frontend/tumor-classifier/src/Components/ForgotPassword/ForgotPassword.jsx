import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message, { position: "top-right", autoClose: 3000 });
    } else if (type === "error") {
      toast.error(message, { position: "top-right", autoClose: 3000 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!email.trim()) {
      showToast("Please enter your email address.", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/forgot-password/",
        { email }
      );
      showToast(
        response.data.message || "Password reset link sent successfully.",
        "success"
      );
    } catch (error) {
      console.log(error.response);
      showToast(
        error.response?.data?.detail || "Failed to send password reset link.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <h1>Forgot Password</h1>
        <p>Enter your registered email to receive a password reset link.</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
        {/* Updated navigation button text */}
        <button
          type="button"
          className="navigate-button"
          onClick={() => navigate("/resetpassword")}
        >
          Already have the link? Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
