import axios from 'axios'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import './Header.css'


function Header() {
    const navigate = useNavigate()

    const { setIsAuthenticated, isAuthenticated, myData } = useContext(AuthContext)

    const handleLogout = () => {
        axios.post('http://localhost:5000/yella/logout', {}, { withCredentials: true })
            .then((res) => {
                setIsAuthenticated(false)
                toast("Logout Successful");
                console.log("User logout success", res);
            })
            .catch((err) => {
                console.log("Error while logout", err)

            })
        navigate('/login')
    }

    return (
        <div className='header'>
            <div className=''>
                {/* <Link to="/" >Home</Link> */}
                <Link to="/profile" >Profile</Link>
                <Link to="/register" >Register</Link>
                {/* {isAuthenticated ?
                    <button onClick={handleLogout} >Log Out</button>
                    :
                    <Link to="/login" >Login</Link>
                } */}
            </div>
            {isAuthenticated &&
                <div>
                    <p>{myData?.name}</p>
                    <p>{myData?.email}</p>
                </div>
            }
        </div>
    )
}

export default Header