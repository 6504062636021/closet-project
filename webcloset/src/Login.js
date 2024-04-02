// Import CSS file for Login component
import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "./lib/axios.mjs";
import swal from "sweetalert2";
import jscookie from "js-cookie";

const Login = ({ setPage }) => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  useEffect(() => {
    if (jscookie.get("token")) {
      setPage("Profile");
    }
  },[])

  const togglePage = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <div className="app">
      {isLoginPage ? (
        <Login1 togglePage={togglePage}setPage={setPage} />
      ) : (
        <Register togglePage={togglePage} setPage={setPage} />
      )}
    </div>
  );
};

const Login1 = ({ togglePage, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    axios.post("auth/login", new URLSearchParams({
      tel: username,
      password: password
    }).toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((res) => {
      jscookie.set("token", res.data.token ,{ expires: 7 });
      swal.fire({
        icon: "success",
        title: "Login success",
        text: res.data.msg,
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        setUsername("");
        setPassword("");
        setPage("Profile");
      })
    }).catch((err) => {
      swal.fire({
        icon: "warning",
        title: "Login failed",
        text: err.response.data.msg,
        timer: 2000,
        showConfirmButton: false
      })
    })

  }

  return (
    <div className="logincontainer">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username: (tel)</label>
          <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} name="password" required />
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

const Register = ({ togglePage, setPage }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    tel: "",
    password: "",
    confirm_password: "",
    address: "",
  });
  const handleform = (type,value) => {
    setFormData({
      ...formData,
      [type]: value
    })
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirm_password){
      swal.fire({
        icon: "warning",
        title: "Register failed",
        text: "กรุณากรอกรหัสผ่านให้ตรงกัน",
        timer: 2000,
        showConfirmButton: false
      })
      return;
    }
    axios.post("auth/register", new URLSearchParams(formData),{
      headers: {
        contentType: "application/x-www-form-urlencoded"
      }
    }).then((e) => {
      swal.fire({
        icon: "success",
        title: "Register success",
        text: e.data.msg,
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        togglePage()
      })
    }).catch((e) => {
      swal.fire({
        icon: "warning",
        title: "Register failed",
        text: e.response.data.msg,
        timer: 2000,
        showConfirmButton: false

      })
    })
  }
  return (
    <div className="logincontainer">
      <h1>User Registration</h1>
      <form onSubmit={handleRegister}>
        <div className="flex gap-3">
        <div className="form-group">
          <label htmlFor="username">name:</label>
          <input type="text" onChange={(e) => handleform('name',e.target.value)} placeholder="name...." required />
        </div>
        
        <div className="form-group">
          <label htmlFor="username">Surname:</label>
          <input type="text"onChange={(e) => handleform('surname',e.target.value)} placeholder="surname...." required />
        </div>
        </div>
        <div className="form-group">
          <label htmlFor="username">Tel:</label>
          <input type="text" onChange={(e) => handleform('tel',e.target.value)} placeholder="Tel...." required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password"onChange={(e) => handleform('password',e.target.value)} placeholder="password..." required />
        </div> 
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input 
          onChange={(e) => handleform('confirm_password',e.target.value)}
            placeholder="confirm password..."
            type="password"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Address:</label>
          <textarea onChange={(e) => handleform('address',e.target.value)} name="Address" className="block p-2.5 w-full text-sm text-gray-900 bg-[#fff] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Address..." required />
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
