import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import './Login.css'



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

    if (isAuthenticated) return <Navigate to="/profile" />

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            password: password
        }

        axios.post('http://localhost:5000/yella/login', payload, { withCredentials: true })
            .then((res) => {
                setIsAuthenticated(true)
                setLoading(false)
                toast.success("Login successfully!");
                console.log("Login done", res);
                // localStorage.setItem('token', JSON.stringify(res.data.token))
                navigate("/profile")
            })
            .catch((err) => {
                toast.error("Something went wrong!");
                console.log("Error while login", err)
                setLoading(false)
            })
    };

    return (
        <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" required />
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? <span className="spinner" /> : 'Login'}
        </button>

        <div className="form-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
    );
};

export default Login;
