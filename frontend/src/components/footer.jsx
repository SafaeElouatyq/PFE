import React from "react";
import '../assets/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <span>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</span>
                <div className="footer-links">
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/privacy">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;