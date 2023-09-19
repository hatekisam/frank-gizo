import React, { useState } from "react";
import "./ImageCarousel.css"; // Import your CSS for styling

const ImageCarousel = ({ imageList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((currentIndex + 1) % imageList.length);
  };

  const prev = () => {
    setCurrentIndex((currentIndex - 1 + imageList.length) % imageList.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {imageList.map((image, index) => (
          <div
            className={`planimage ${index === currentIndex ? "active" : ""}`}
            key={index}
          >
            <img className="--card-image" alt="Card image" src={image} />
          </div>
        ))}
      </div>
      <div className="carousel-buttons">
        {imageList.map((_, index) => (
          <button
            key={index}
            className={`carousel-button ${
              index === currentIndex ? "active" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
      <button className="prev-button" onClick={prev}>
        Previous
      </button>
      <button className="next-button" onClick={next}>
        Next
      </button>
    </div>
  );
};

export default ImageCarousel;
