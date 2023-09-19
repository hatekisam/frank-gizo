import React from "react";
import "./BlueButton.css";
import { useNavigate } from "react-router-dom";



function BlueButton(props) {
  const navigate = useNavigate();
  const buttonClicked = () => {
    navigate(props.to);
  }
  return (
    <button to={`${props.to}`} className="--main-blue-button" onClick={buttonClicked}>
      {props.text}
    </button>
  );
}

export default BlueButton;
