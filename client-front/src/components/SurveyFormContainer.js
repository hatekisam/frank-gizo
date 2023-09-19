import { useNavigate } from "react-router-dom";
import "./SurveyFormContainer.css";
const SurveyFormContainer = () => {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("/ourservices");
  };

  return (
    <div className="frame-div">
      <div className="frame-parent1">
        <div className="vector-parent">
          <img className="vector-icon" alt="" src="/vector1.svg" />
          <div className="topography">{`Topography `}</div>
        </div>
        <div className="vector-group">
          <img className="vector-icon1" alt="" src="/vector2.svg" />
          <div className="cadastral-plan">Cadastral plan</div>
        </div>
        <div className="vector-container">
          <img className="vector-icon2" alt="" src="/vector3.svg" />
          <b className="surveying-work">Surveying work</b>
        </div>
        <button className="button1" onClick={onButtonClick}>
          <div className="group-div">
            <img className="vector-icon3" alt="" src="/vector4.svg" />
            <div className="know-more">Know more</div>
          </div>
        </button>
      </div>
      <div className="image-5-parent">
        <img className="image-5-icon" alt="" src="/image-5@2x.png" />
        <div className="rectangle-div" />
      </div>
    </div>
  );
};

export default SurveyFormContainer;
