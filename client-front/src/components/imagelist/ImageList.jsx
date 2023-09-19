import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, config } from "../../utils/api";
import { GrLinkNext } from "react-icons/gr";
import "./ImageList.css";
import BlueButton from "../BlueButton/BlueButton";
import { Link } from "react-router-dom";



function Gallery() {
   const [plans, setPlans] = useState([]);
   const filterImages = (projects) => {
     const allImages = [];
     projects.forEach((project) => {
       if (project.images && Array.isArray(project.images)) {
         project.images.forEach((image) => {
           allImages.push(image);
         });
       }
     });
     return allImages.slice(0, 9); // Limit to the first 9 images
   };
   const availableProjects = filterImages(plans);



  
useEffect(() => {
  const fetchPlans = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/projects`,
        config
      );
     
      

      if (response.data.success) {
        setPlans(response.data.data.projects);
      } else {
        // toast.error("Failed to fetch owners");
      }
    } catch (error) {
      // toast.error("An error occurred while fetching owners");
    }
  };
  fetchPlans();
}, []);
    
    

  const [currentIndex, setCurrentIndex] = useState(null);

  const renderImageContent = (src, index) => (
    <div key={index} onClick={() => openModal(index)}>
      <img src={src} alt={`Image ${index}`} />
    </div>
  );

  const openModal = (index) => {
    setCurrentIndex(index);
  };

  const closeModal = (e) => {
    if (e != undefined) {
      e.preventDefault();
    }
    setCurrentIndex(null);
  };

  const findPrev = (e) => {
    if (e != undefined) {
      e.preventDefault();
    }
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const findNext = (e) => {
    if (e != undefined) {
      e.preventDefault();
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="gallery-container">
      <div className="--view-more">

      <Link to="/projects">
        Explore more&nbsp;&nbsp; <GrLinkNext className="--icon" />
      </Link>
      </div>
      <div className="gallery-grid">
        {availableProjects.map(renderImageContent)}
      </div>
      <GalleryModal
        closeModal={closeModal}
        findPrev={findPrev}
        findNext={findNext}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex + 1 < availableProjects.length}
        src={availableProjects[currentIndex]}
      />
    </div>
  );
}

function GalleryModal({
  closeModal,
  findPrev,
  findNext,
  hasPrev,
  hasNext,
  src,
}) {
  const handleKeyDown = (e) => {
    if (e.keyCode === 27) closeModal();
    if (e.keyCode === 37 && hasPrev) findPrev();
    if (e.keyCode === 39 && hasNext) findNext();
  };

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div>
      {src && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal">
            <div className="modal-body">
              <a
                href="#"
                className="modal-close"
                onClick={closeModal}
                onKeyDown={handleKeyDown}
              >
                &times;
              </a>
              {hasPrev && (
                <a
                  href="#"
                  className="modal-prev"
                  onClick={findPrev}
                  onKeyDown={handleKeyDown}
                >
                  &lsaquo;
                </a>
              )}
              {hasNext && (
                <a
                  href="#"
                  className="modal-next"
                  onClick={findNext}
                  onKeyDown={handleKeyDown}
                >
                  &rsaquo;
                </a>
              )}
              <img src={src} alt="Gallery Image" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Gallery;
