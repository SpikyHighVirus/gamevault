import React, { useState } from 'react';
import './TrendingGames.css';

const TrendingGames = ({ games }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleGames = 5; // Number of games to show at a time

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + visibleGames < games.length ? prevIndex + visibleGames : 0
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - visibleGames >= 0 ? prevIndex - visibleGames : games.length - visibleGames
        );
    };

    return (
        <div className="trending-games-container">
            <button className="arrow left-arrow" onClick={prevSlide}>
                &#8592;
            </button>
            <div className="trending-games">
                {games.slice(currentIndex, currentIndex + visibleGames).map((game) => (
                    <div className="trending-card" key={game.id}>
                        <img src={game.background_image} alt={game.name} />
                        <div className="card-content">
                            <h3>{game.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <button className="arrow right-arrow" onClick={nextSlide}>
                &#8594;
            </button>
        </div>
    );
};

export default TrendingGames;
