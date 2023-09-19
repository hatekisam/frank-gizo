import { useNavigate } from "react-router-dom";
import "./PlanBuildingContainer.css";
const PlanBuildingContainer = () => {
  const navigate = useNavigate();

  const onPlanCardContainer2Click = () => {
    navigate("/plandetails");
  };

  return (
    <div className="plancard3" onClick={onPlanCardContainer2Click}>
      <img className="plancard-child3" alt="" src="/rectangle-251@2x.png" />
      <div className="line-parent">
        <div className="frame-child3" />
        <div className="building-plan-2">Building plan 2</div>
        <div className="div11">$3000.00</div>
        <img className="image-13-icon" alt="" src="/image-13@2x.png" />
      </div>
      <div className="frame-child3" />
      <div className="plandescription3">
        <div className="building-plan-15">Building plan 1</div>
        <div className="div12">$3000.00</div>
      </div>
    </div>
  );
};

export default PlanBuildingContainer;
