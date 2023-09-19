import React from "react";
import BlueButton from "../BlueButton/BlueButton";
import "./Service.css";
import { MdMiscellaneousServices } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SERVICES } from "../../scripts/constants";

function Service() {
  function displayAllServices() {}
  function displayConstructionServices() {}
  function displayPlumbingServices() {}
  function displaySurveyingServices() {}
  return (
    <div className="--service-section ">
  
      {Object.keys(SERVICES).map((key, index) => {
        return (
          <div
            key={index}
            className={
              index == 1
                ? `--service-content reveal right`
                : `--service-content reveal`
            }
          >
            <div className="--service-description">
              <div className="--service-title">
                <h3>
                  <MdMiscellaneousServices />
                  &nbsp; &nbsp;
                  {SERVICES[key].title}
                </h3>
              </div>
              <div className="--service-listing">
                {SERVICES[key].subtasks.map((task, index) => {
                  return (
                    <p key={index}>
                      <FaTasks className="--service-icon" /> {task}
                    </p>
                  );
                })}
           
              </div>
            </div>
            <div className="--service-img">
              <img
                src={`/${SERVICES[key].img}`}
                alt="Service image"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Service;
