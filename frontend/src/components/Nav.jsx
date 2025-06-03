import React from "react";
import { Link } from "react-router-dom";
import "../assets/navbar.css";
const Nav = () => {
    return (
        <nav className="navbarr">
            <ul className="nav-links">
                
                <li className="link">
                    <Link to="/acceuil">
                        Acceuil
                    </Link>
                </li>
                <li className="link">
                    <Link to="#" >
                        Personnalise
                    </Link>
                </li>
                <li className="link">
                    <Link to="#" >
                        Favoris
                    </Link>
                </li>
                 <li className="link">
                    <Link to="#" >
                        panier
                    </Link>
                </li>
                 <li className="link">
                    <Link to="#" >
                        profile
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
export default Nav;



