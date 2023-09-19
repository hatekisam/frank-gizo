import React from "react";
import { Link } from "react-router-dom";
import "./Plansnav.css";

const PlansNav = ({ categories, activeCategoryId, onLinkClick }) => {
  return (
    <div className="plansnav">
      <Link
        to="/projects"
        className={`nav-link ${activeCategoryId === null ? "active" : ""}`}
        onClick={() => onLinkClick(null)}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          to="/projects"
          className={`nav-link ${
            activeCategoryId === category._id ? "active" : ""
          }`}
          onClick={() => onLinkClick(category._id)}
          key={category._id}
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
};

export default PlansNav;
