import React from "react";
import "./LandingSection.css";

function LandingSection(props) {
  function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  return (
    <div className="--landing-section reveal" id="about">
      {window.addEventListener("scroll", reveal)}
      <div className={`--section-headline `}>
        <div className="--section-name">{props.text}</div>
        <div className="--section-number">{props.number}</div>
      </div>
      <div className="--section-content">{props.children}</div>
    </div>
  );
}

export default LandingSection;
