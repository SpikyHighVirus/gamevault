import React, { useState, useEffect } from 'react';
import './HeroCarousel.css';

const HeroCarousel = ({ games }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % games.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + games.length) % games.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Changes slide every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentSlide]);

  return (
    <div className="hero-carousel">
      {games.length > 0 && (
        <>
          <div
            className="carousel-slide"
            style={{
              backgroundImage: `url(${games[currentSlide].background_image})`,
            }}
          >
            <div className="carousel-content">
              <h1>{games[currentSlide].name}</h1>
              <p>Released: {games[currentSlide].released}</p>
            </div>
          </div>
          <button className="carousel-arrow left" onClick={prevSlide}>
            &#8678;
          </button>
          <button className="carousel-arrow right" onClick={nextSlide}>
            &#8680;
          </button>
        </>
      )}
    </div>
  );
};

export default HeroCarousel;
