import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./pages/ProtectRouter";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Header from "./pages/header/Header";


export default function App() {

  return (
    <>
      <ToastContainer />
      <Router>
     
        <Routes>

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />

          </Route>

          <Route path="/" element={<Register />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>

    </>
  )
}