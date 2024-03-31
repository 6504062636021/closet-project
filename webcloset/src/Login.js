// Import CSS file for Login component
import React, { useState } from "react";
import "./Login.css";

const Login = ({ setPage }) => {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const togglePage = () => {
    setIsLoginPage(!isLoginPage);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Your login logic here
    // Assume login is successful
    setPage("Profile");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Your register logic here
    // Once registration is successful, call setPage function to switch to the login page
    setPage("Login");
  };

  return (
    <div className="app">
      {isLoginPage ? (
        <Login1 togglePage={togglePage} handleLogin={handleLogin} setPage={setPage} />
      ) : (
        <Register togglePage={togglePage} handleRegister={handleRegister} setPage={setPage} />
      )}
    </div>
  );
};

const Login1 = ({ togglePage, handleLogin, setPage }) => {
  return (
    <div className="logincontainer">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        <p>Don't have an account?</p>
        <button onClick={togglePage}>Register here</button>
      </div>
    </div>
  );
};

const Register = ({ togglePage, handleRegister, setPage }) => {
  return (
    <div className="logincontainer">
      <h1>User Registration</h1>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="login-link">
        <p>Already have an account?</p>
        <button onClick={togglePage}>Login here</button>
      </div>
    </div>
  );
};

export default Login;
