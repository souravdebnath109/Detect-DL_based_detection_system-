import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUpClick = () => setIsRightPanelActive(true);
  const handleSignInClick = () => setIsRightPanelActive(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const showToast = (message, type) => {
    toast[type](message, { position: "top-right", autoClose: 3000 });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/login/",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      showToast("Login successful!", "success");
      localStorage.setItem("accessToken", response.data.tokens.access);
      localStorage.setItem("refreshToken", response.data.tokens.refresh);
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Login failed. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    // Validation
    if (
      !registerData.username.trim() ||
      !registerData.email.trim() ||
      !registerData.password1.trim() ||
      !registerData.password2.trim()
    ) {
      showToast("Please fill all required fields", "error");
      return;
    }

    if (registerData.password1 !== registerData.password2) {
      showToast("Passwords don't match", "error");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/accounts/register/",
        {
          username: registerData.username,
          email: registerData.email,
          password1: registerData.password1,
          password2: registerData.password2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      showToast("Registration successful! Redirecting...", "success");
      setTimeout(() => setIsRightPanelActive(false), 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}>
        {/* Sign-Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegisterSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              name="username"
              placeholder="Name"
              value={registerData.username}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="password"
              name="password1"
              placeholder="Password"
              value={registerData.password1}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={registerData.password2}
              onChange={handleRegisterChange}
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </form>
        </div>

        {/* Sign-In Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <h1>Sign in</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign In"}
            </button>
            {/* <Link to="/loginadmin" className="ghost">
              Are you an admin?
            </Link> */}
            <Link to="/forget_password" className="ghost">
              Forgot Password?
            </Link>
          </form>
        </div>

        {/* Overlay Panels */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Please login with your personal info</p>
              <button className="ghost" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your details to start your journey</p>
              <button className="ghost" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
