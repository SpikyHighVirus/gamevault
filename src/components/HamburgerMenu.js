import React from "react";
import { useNavigate } from "react-router-dom";
import "./HamburgerMenu.css";

const HamburgerMenu = () => {
    const navigate = useNavigate();

    return (
        <div className="hamburger-menu" onClick={() => navigate("/library")}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default HamburgerMenu;
