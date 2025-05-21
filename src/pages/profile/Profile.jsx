import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import './profile.css'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'


const Profile = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState('')

     const navigate = useNavigate()

    const { setIsAuthenticated, isAuthenticated, myData } = useContext(AuthContext)

    const handleLogout = () => {
        axios.post('https://register-login-backend-cm9c.onrender.com/yella/logout', {}, { withCredentials: true })
            .then((res) => {
                setIsAuthenticated(false)
                toast("Logout Successful");
                console.log("User logout success", res);
            })
            .catch((err) => {
                console.log("Error while logout", err)

            })
        navigate('/register')
    }


    const fetchData = () => {


        axios.post('https://register-login-backend-cm9c.onrender.com/yella/profile', {}, { withCredentials: true })
            .then((res) => {
                setLoading(false)
                setData(res.data.data)
                console.log("User data fetched", res);
            })
            .catch((err) => {
                console.log("Error while fetch data", err)
                setLoading(false)
            })
    }

    console.log("data", data)

    useEffect(() => {
        fetchData()
    }, [])

    

    return (
  <div className="profile-page">
  <p className="loading-text">{loading && "Data is loading..."}</p>
  <div className="profile-card">
    <div className="profile-content">
      <h2>🌟 Name: <span>{data.name}</span></h2>
      <p>📧 Email:  <span>{data.email}</span></p>
      <p>🆔 ID:  <span>{data.id}</span></p>

            <div className="button-wrapper">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

    </div>
  </div>
</div>


    )
}

export default Profile