import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./firebase";
// import Swal from "sweetalert2";
import "./Login.css";

function LoginForm() {
  const [email , setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!email || !password){
      window.Swal.fire({
        title: "Error!",
        text: "Please fill in all fields.",
        icon: "error"
      })
      return;
    }

    if(!validateEmail(email)){
      window.Swal.fire({
        title: "Error!",
        text: "Please enter a valid email address with correct syntax\nFor Example: name@domian.com.",
        icon: "error"
      })
      return;
    }

    if(password.length < 6){
      window.Swal.fire({
        title: "Error!",
        text: "Password must be at least 6 characters long.",
        icon: "error"
      })
      return;
    }

    try{
      const userCredentials = await window.firebase.auth().signInWithEmailAndPassword(
        // auth,
        email,
        password,
      );

      window.Swal.fire({
        title: "Success!",
        text: "Login Successful",
        icon: "success"
      });
      
      console.log("User Logged In: " + userCredentials.user);
      

    }catch(error){
      window.Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error"
      });
  }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="bank-logo">AS Bank</div>
          <h1>Welcome Back</h1>
          <p>Sign in to access your account</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              value={email}
              className="form-input"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value.trim())}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-input"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value.trim())}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <a href="#forgot" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>

          <div className="signup-link">
            Don't have an account?
            <a href="signup">Sign up now</a>
          </div>
        </form>

        <div className="bank-features">
          <div className="feature">
            <span className="feature-icon">🔒</span>
            <div>Secure & Encrypted</div>
          </div>
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <div>Instant Access</div>
          </div>
          <div className="feature">
            <span className="feature-icon">📱</span>
            <div>24/7 Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
