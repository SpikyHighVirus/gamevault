import React from "react";
import "./GameGrid.css";

const GameGrid = ({ games, onGameClick }) => {
    return (
        <div className="game-grid">
            {games.map((game) => (
                <div
                    key={game.id}
                    className="game-card"
                    onClick={() => onGameClick(game)} // Trigger modal opening
                >
                    <img src={game.background_image} alt={game.name} />
                    <h3>{game.name}</h3>
                </div>
            ))}
        </div>
    );
};

export default GameGrid;
