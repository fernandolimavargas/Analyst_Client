import React, { useContext } from 'react';

import './style.css';

import { RiUser6Line, RiLogoutCircleLine} from "react-icons/ri";
import { AuthContext } from "../../contexts/auth";
import { useState, useEffect } from 'react';


function NavBar() {
    const { logout } = useContext(AuthContext);
    const [user, setUser] = useState(null)

    useEffect(() => {
        const userLogin = localStorage.getItem("user")
        const nameUser = JSON.parse(userLogin).name

        setUser(nameUser)
    }, [])

    const handleLogout = () => {
        logout();
    }

    return (
        <div className="navbar">
            <div className="col-6 navbar-lside">
                <span>Linx DMS Help</span>
            </div>
            <div className="col-6 navbar-rside">
                <a href="#">
                    <RiUser6Line />
                    <span>{user}</span>
                </a>
                <RiLogoutCircleLine onClick={handleLogout} className="logout"/>
            </div>
        </div>
    )
}

export default NavBar