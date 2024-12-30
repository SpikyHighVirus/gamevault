import React from 'react';
import './Footer.css';

const Footer = ({ filterGamesByLetter }) => {
    const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    return (
        <footer className="footer">
            <div className="footer-content">
                <h2 className="footer-title">GameVault</h2>
                <p>A-Z List</p>
                <p>Search games in alphabetical order:</p>
                <div className="letter-list">
                    {letters.map((letter) => (
                        <button
                            key={letter}
                            onClick={() => filterGamesByLetter(letter)}
                            className="letter-button"
                        >
                            {letter}
                        </button>
                    ))}
                </div>
                <p>Connect with Me</p>
                <div className="social-links">
                    <a href="https://github.com/SpikyHighVirus" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="https://www.instagram.com/spikyhighvirus" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
                <p>&copy; 2024 GameVault. All rights reserved.</p>
                <p>
                    GameVault does not store any games on its server. All data is fetched from third-party APIs like RAWG.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
