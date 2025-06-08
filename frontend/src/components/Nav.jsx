import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/navbar.css";

const Nav = () => {
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbarr">
            <ul className="nav-links">
                <li className="link">
                    <Link to="/acceuil">Acceuil</Link>
                </li>
                <li className="link">
                    <Link to="/personnalise">Personnalise</Link>
                </li>
                <li className="link">
                    <Link to="/favoris">Favoris</Link>
                </li>
                <li className="link">
                    <Link to="/panier">panier</Link>
                </li>
                <li className="link">
                    <Link to="/profile">profile</Link>
                </li>
              
            </ul>
        </nav>
    );
};

export default Nav;



