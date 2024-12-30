import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HeroCarousel from "./components/HeroCarousel";
import TrendingGames from "./components/TrendingGames";
import GameGrid from "./components/GameGrid";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import LibraryMenu from "./components/LibraryMenu";
import "./App.css";

const App = () => {
    const API_KEY = "ded145e9d537452eb4477f0a798abcd6";
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [activeLetter, setActiveLetter] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [gameDetails, setGameDetails] = useState(null);
    const [library, setLibrary] = useState({
        Playing: [],
        Completed: [],
        OnHold: [],
        Dropped: [],
        PlanToPlay: [],
    });

    const navigate = useNavigate();
    const gamesPerPage = 12;

    useEffect(() => {
        const fetchGames = async () => {
            try {
                let allGames = [];
                let page = 1;
                const pageSize = 40;
                let totalResults = 0;

                do {
                    const response = await fetch(
                        `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${pageSize}`
                    );
                    const data = await response.json();
                    if (data.results) {
                        allGames = [...allGames, ...data.results];
                    }
                    totalResults = data.count;
                    page++;
                } while (allGames.length < totalResults && page <= 5);

                setGames(allGames);
                setFilteredGames(allGames);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };

        fetchGames();
    }, []);

    const filterGamesByLetter = (letter) => {
        if (letter === activeLetter) {
            setFilteredGames(games);
            setActiveLetter(null);
        } else {
            const filtered = games.filter((game) =>
                game.name.toLowerCase().startsWith(letter.toLowerCase())
            );
            setFilteredGames(filtered);
            setActiveLetter(letter);
            setCurrentPage(1);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = games.filter((game) =>
            game.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredGames(filtered);
        setCurrentPage(1);
    };

    const handleStatusChange = (gameId, status) => {
        const game = games.find((g) => g.id === gameId);
        if (!game) return;

        setLibrary((prevLibrary) => {
            const updatedLibrary = { ...prevLibrary };

            // Remove the game from all categories
            for (let key in updatedLibrary) {
                updatedLibrary[key] = updatedLibrary[key].filter((g) => g.id !== gameId);
            }

            // Add the game to the selected category
            updatedLibrary[status].push(game);

            return updatedLibrary;
        });

        // Close the modal
        setGameDetails(null);
    };

    const handleGameClick = (game) => {
        setGameDetails(game);
    };

    // Paginate games
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

    const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="app-container">
            <div className="title-bar">
                <h1 className="logo" onClick={() => navigate("/")}>
                    Game<span>Vault</span>
                </h1>
                <div className="hamburger-menu" onClick={() => navigate("/library")}>
                    &#9776;
                </div>
            </div>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <header className="hero-section">
                                {games && games.length > 0 ? (
                                    <HeroCarousel games={games.slice(0, 5)} />
                                ) : (
                                    <p>Loading games...</p>
                                )}
                            </header>

                            <div className="content">
                                <div className="main">
                                    <section className="trending-games-section">
                                        <h2 className="section-title">Trending Games</h2>
                                        {games && games.length > 0 ? (
                                            <TrendingGames games={games.slice(0, 10)} />
                                        ) : (
                                            <p>Loading trending games...</p>
                                        )}
                                    </section>

                                    <section className="game-grid-section">
                                        <div className="discover-header">
                                            <h2 className="section-title">Discover Games</h2>
                                            <div className="search-bar">
                                                <input
                                                    type="text"
                                                    placeholder="Search games..."
                                                    value={searchQuery}
                                                    onChange={(e) => handleSearch(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        {currentGames && currentGames.length > 0 ? (
                                            <GameGrid
                                                games={currentGames}
                                                onGameClick={handleGameClick}
                                            />
                                        ) : (
                                            <p>No games found for this filter.</p>
                                        )}
                                        {totalPages > 1 && (
                                            <div className="pagination">
                                                {Array.from({ length: totalPages }).map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        className={`page-btn ${
                                                            currentPage === idx + 1 ? "active" : ""
                                                        }`}
                                                        onClick={() => changePage(idx + 1)}
                                                    >
                                                        {idx + 1}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </section>
                                </div>

                                <Sidebar />
                            </div>

                            <Footer filterGamesByLetter={filterGamesByLetter} />
                        </>
                    }
                />
                <Route path="/library" element={<LibraryMenu library={library} />} />
            </Routes>

            {gameDetails && (
                <div className="game-modal">
                    <div className="modal-content">
                        <span className="close-modal" onClick={() => setGameDetails(null)}>
                            &times;
                        </span>
                        <img
                            src={gameDetails.background_image}
                            alt={gameDetails.name}
                            className="modal-game-image"
                        />
                        <h2>{gameDetails.name}</h2>
                        <p>Rating: {gameDetails.rating}</p>
                        <p>Release Date: {gameDetails.released}</p>
                        <p>
                            Genres:{" "}
                            {gameDetails.genres?.map((genre) => genre.name).join(", ") || "N/A"}
                        </p>
                        <div className="dropdown-container">
                            <select
                                onChange={(e) =>
                                    handleStatusChange(gameDetails.id, e.target.value)
                                }
                            >
                                <option value="">Select Status</option>
                                <option value="Playing">Playing</option>
                                <option value="Completed">Completed</option>
                                <option value="OnHold">On Hold</option>
                                <option value="Dropped">Dropped</option>
                                <option value="PlanToPlay">Plan to Play</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
