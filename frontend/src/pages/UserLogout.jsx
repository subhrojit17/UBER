import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const UserLogout = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    axios.get(`${import.meta.env.VITE_BASE_URL}users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            localStorage.removeItem("token");
            navigate("/user-login");
        })
        .catch((error) => {
            console.error("Logout error:", error);
        });
  return (
    <div>
      User Logout
    </div>
  )
}

export default UserLogout
