import React from "react";
import "./LibraryMenu.css";

const LibraryMenu = ({ library }) => {
    const categories = Object.keys(library);

    return (
        <div className="library-menu">
            <h2>Your Library</h2>
            {categories.map((category) => (
                <div key={category} className="library-category">
                    <h3>{category}</h3>
                    <div className="library-games">
                        {library[category].length > 0 ? (
                            library[category].map((game) => (
                                <div key={game.id} className="library-game-card">
                                    <img
                                        src={game.background_image}
                                        alt={game.name}
                                        className="library-game-image"
                                    />
                                    <h4>{game.name}</h4>
                                </div>
                            ))
                        ) : (
                            <p>No games in this category yet.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LibraryMenu;
