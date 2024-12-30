import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <a href="/">GameVault</a>
            </div>
            <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#trending-games">Trending Games</a></li>
                <li><a href="#latest-games">Latest Games</a></li>
                <li><a href="#upcoming-games">Upcoming Games</a></li>
            </ul>
            <div className="social-icons">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">📘</a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer">🎮</a>
            </div>
        </nav>
    );
};

export default Navbar;
