import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/navbar.css";
import Logo from "../assets/images/S-M.png";

const Nav = () => {
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbarr">
            <div className="navbarr-logo">
                <Link to="/acceuil">
                    <img src={Logo} alt="logo" className="navbarr-logo-img" />
                </Link>
            </div>
            <ul className="navbarr-links">
                <li>
                    <Link to="/acceuil">Acceuil</Link>
                </li>
                <li>
                    <Link to="/personnalise">Personnalise</Link>
                </li>
                <li>
                    <Link to="/favoris">Favoris</Link>
                </li>
                <li>
                    <Link to="/panier">Panier</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;



