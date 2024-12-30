import React from "react";
import "./Modal.css";

const Modal = ({ game, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={closeModal}>
          &times;
        </button>
        <div className="modal-header">
          <img
            src={game.background_image}
            alt={game.name}
            className="modal-image"
          />
          <div className="modal-info">
            <h2>{game.name}</h2>
            <p>Rating: {game.rating}</p>
            <p>Released: {game.released}</p>
            <p>
              Genres:{" "}
              {game.genres ? game.genres.map((g) => g.name).join(", ") : "N/A"}
            </p>
          </div>
        </div>
        <div className="modal-body">
          <h3>Description</h3>
          <p>{game.description_raw || "No description available."}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
