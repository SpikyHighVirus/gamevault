import React from "react";
import "./Sidebar.css";

const genres = [
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Sports",
  "Shooter",
  "Horror",
  "Puzzle",
  "Racing",
  "Simulation",
];

const top10 = [
  { rank: 1, name: "Grand Theft Auto V", score: "98" },
  { rank: 2, name: "The Witcher 3: Wild Hunt", score: "96" },
  { rank: 3, name: "Portal 2", score: "95" },
  { rank: 4, name: "Counter-Strike: Global Offensive", score: "94" },
  { rank: 5, name: "Tomb Raider (2013)", score: "93" },
  { rank: 6, name: "Red Dead Redemption 2", score: "92" },
  { rank: 7, name: "Elden Ring", score: "91" },
  { rank: 8, name: "Hades", score: "90" },
  { rank: 9, name: "Minecraft", score: "89" },
  { rank: 10, name: "It Takes Two", score: "88" },
];

const Sidebar = ({ activeGenre, filterGamesByGenre }) => {
  return (
    <div className="sidebar">
      {/* Genres Section */}
      <div className="genres">
        <h2>Genres</h2>
        <ul>
          <li
            className={`genre-item ${
              activeGenre === "All Genres" ? "active" : ""
            }`}
            onClick={() => filterGamesByGenre("All Genres")}
          >
            All Genres
          </li>
          {genres.map((genre, index) => (
            <li
              key={index}
              className={`genre-item ${
                activeGenre === genre ? "active" : ""
              }`}
              onClick={() => filterGamesByGenre(genre)}
            >
              {genre}
            </li>
          ))}
        </ul>
      </div>

      {/* Top 10 Section */}
      <div className="top10">
        <h2>Top 10</h2>
        <ul>
          {top10.map((game) => (
            <li key={game.rank}>
              <span>{game.rank}.</span> {game.name}{" "}
              <span>({game.score})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
