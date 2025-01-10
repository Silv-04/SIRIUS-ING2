// src/components/Navbar.js
import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar-gradient">
            <div>
                <h1>MonSite</h1>
            </div>
            <div>
                <a href="#accueil">Accueil</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </div>
        </nav>
    );
};

export default Navbar;
