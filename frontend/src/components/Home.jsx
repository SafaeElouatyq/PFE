import "../assets/home.css";
import { Link } from "react-router-dom";
import Logo from "../assets/images/S-M.png";
import cookie from "../assets/images/cookie.png";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";

const Home = () => {
  return (
    <section className="home">
      <nav className="home-navbar">
        <div className="home-logo">
          <Link to="/admin-login">
            <img src={Logo} alt="logo" className="home-logo-img" />
          </Link>
        </div>
        <ul className="home-nav-links">
          <li>
            <Link to="/register" className="nav-inscription">
              Inscription
            </Link>
          </li>
          <li>
            <Link to="/login" className="nav-connexion">
              Connexion
            </Link>
          </li>
        </ul>
      </nav>

      <div className="home-content">
        <div className="home-text">
          <h1>Every piece of dessert has a story</h1>
          <p>
            Create, try, and enjoy desserts made just for you. Because every
            moment deserves a special treat.
          </p>
          <Link to='/login'>
            <button className="order-btn">Commander !</button>
          </Link>
          <div className="icones">
            <a href="#"><FaFacebook className="icon facebook" /></a>
            <a href="#"><FaInstagram className="icon instagram" /></a>
            <a href="#"><FaWhatsapp className="icon whatsapp" /></a>
          </div>
        </div>
        <div className="home-image">
          <img src={cookie} alt="Dessert" />
        </div>
      </div>
    </section>
  );
};

export default Home;
