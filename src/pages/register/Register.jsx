import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Register.css'


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // const notify = () => toast("Registration Successful");

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const payload = {
      name: userName,
      email: email,
      password: password,
    };

    axios
      .post("https://register-login-backend-cm9c.onrender.com/yella/register", payload)
      .then((res) => {
        setLoading(false);
       toast.success("Registered successfully!");
        console.log("User register", res);
        navigate("/login");
      })
      .catch((err) => {
       toast.error("Something went wrong!");
        console.log("Error while reiteration", err);
        setLoading(false);
      });
  };

  return (
    <>
         <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text"  id="name" value={userName} onChange={((e)=>setUserName(e.target.value))} placeholder="John Doe" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" value={email} onChange={((e)=>setEmail(e.target.value))} placeholder="example@email.com" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password"value={password} onChange={((e)=>setPassword(e.target.value))} id="password" placeholder="********" required />
        </div>

  <button type="submit" className="register-btn" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <div className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
    </>
  );
}

export default Register;
