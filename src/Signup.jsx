import React, { useState } from "react";
import "./Signup.css";

function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accountType: "personal",
    acceptTerms: false,
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
const [passwordChecks, setPasswordChecks] = useState({
  length: false,
  uppercase: false,
  number: false,
  special: false
});
  const [signupButton , setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const validEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    const checkPasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };

  const strength = Object.values(checks).filter(Boolean).length;

  setPasswordChecks(checks);
  setPasswordStrength(strength);
};


    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      window.Swal.fire({
        title: "Error!",
        text: "Please fill all fields.",
        icon: "error",
      });
      return;
    }

    if (!validEmail(formData.email)) {
      window.Swal.fire({
        title: "Error!",
        text: "Please enter a valid email address with correct syntax\nFor Example: name@domian.com.",
        icon: "error",
      });
      return;
    }

    if (passwordStrength < 4) {
    window.Swal.fire({
      icon: "error",
      title: "Weak Password",
      text: "Password must meet all strength requirements."
    });
    return;
    }


    try {
      setLoading(true);
        const userCredentials = await window.firebase.auth().createUserWithEmailAndPassword(
            formData.email,
            formData.password
        );
        console.log("User Added");
        
        await userCredentials.user.updateProfile({
            displayName: `${formData.firstName}` + " " + `${formData.lastName}`
        });
        console.log("Name Set");
        
        const db = window.firebase.firestore();
        await db.collection("users")
        .doc(userCredentials.user.uid)
        .set({
            firstName: formData.firstName,
            lastName: formData.lastName,
            userEmail: formData.email,
            userPhone: formData.phone,
            userAccountType: formData.accountType,
            createdAt: new Date(),
        });
        console.log("All done");
        window.Swal.fire({
          title: "Success!",
          text: "Signup Successfully!",
          icon: "success"
        });

        window.location.href = "/login"
    } catch (error) {
        window.Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "error"
        });
    }

  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <div className="bank-logo-signup">AS Bank</div>
          <h1>Create Your Account</h1>
          <p>Join AS Bank in just a few steps</p>
        </div>

        <form className="signup-form" onSubmit={handleSignup}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="required">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-input"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="required">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-input"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="required">
              Email Address
            </label>
            <div className="input-with-icon">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="required">
              Phone Number
            </label>
            <div className="input-with-icon">
              <span className="input-icon">📱</span>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
                placeholder="+92 300 1234567"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="accountType">Account Type</label>
            <div className="account-type">
              <label>
                <input
                  type="radio"
                  name="accountType"
                  value="personal"
                  checked={formData.accountType === "personal"}
                  onChange={handleChange}
                />
                <span>Personal</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="accountType"
                  value="business"
                  checked={formData.accountType === "business"}
                  onChange={handleChange}
                />
                <span>Business</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="required">
              Password
            </label>
            <div className="input-with-icon">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-input"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <div className="password-strength">
  <div>Password strength</div>
  <div className="strength-bar">
    <div
      className="strength-fill"
      style={{
        width: `${(passwordStrength / 4) * 100}%`,
        backgroundColor:
          passwordStrength <= 1
            ? "red"
            : passwordStrength === 2
            ? "orange"
            : passwordStrength === 3
            ? "yellowgreen"
            : "green"
      }}
    />
  </div>
</div>

<div className="password-requirements">
  <div style={{ color: passwordChecks.length ? "green" : "red" }}>
    ✔ At least 8 characters
  </div>
  <div style={{ color: passwordChecks.uppercase ? "green" : "red" }}>
    ✔ One uppercase letter
  </div>
  <div style={{ color: passwordChecks.number ? "green" : "red" }}>
    ✔ One number
  </div>
  <div style={{ color: passwordChecks.special ? "green" : "red" }}>
    ✔ One special character
  </div>
</div>
</div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="required">
              Confirm Password
            </label>
            <div className="input-with-icon">
              <span className="input-icon">🔒</span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="terms">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
            />
            <div>
              I agree to the <a href="#terms">Terms of Service</a> and{" "}
              <a href="#privacy">Privacy Policy</a>. I confirm that I am at
              least 18 years old and all information provided is accurate.
            </div>
          </div>

          <button
            type="submit"
            className="signup-button"
            value={signupButton}
            disabled={!formData.acceptTerms}
          >
            {signupButton ? "Creating Account..." : "create Account"}
          </button>

          <div className="login-link">
            Already have an account?
            <a href="/login">Sign in here</a>
          </div>
        </form>

        <div className="signup-features">
          <div className="signup-feature">
            <span className="icon">⚡</span>
            <div className="title">Instant Account</div>
            <div className="desc">Get started in minutes</div>
          </div>
          <div className="signup-feature">
            <span className="icon">🔐</span>
            <div className="title">Bank-Level Security</div>
            <div className="desc">Your data is protected</div>
          </div>
          <div className="signup-feature">
            <span className="icon">🎁</span>
            <div className="title">Welcome Bonus</div>
            <div className="desc">Special benefits for new users</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
