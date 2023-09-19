import { useMemo } from "react";
import { Link } from "react-router-dom";
import "./SidebarContainer.css";
const SidebarContainer = ({
  propHeight,
  propTop,
  onDashboardClick,
  onNotificationsClick,
  onPlansClick,
}) => {
  const sidebarStyle = useMemo(() => {
    return {
      height: propHeight,
    };
  }, [propHeight]);

  const sidebarLinksStyle = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

  return (
    <div className="sidebar1" style={sidebarStyle}>
      <div className="sidebarlinks1" style={sidebarLinksStyle}>
        <a className="dashboard6" onClick={onDashboardClick}>
          <div className="dashboard7">Dashboard</div>
          <img
            className="ridashboard-fill-icon2"
            alt=""
            src="/dashboardicon.svg"
          />
        </a>
        <Link
          className="notifications6"
          to="/admin-notifications"
          onClick={onNotificationsClick}
        >
          <img
            className="material-symbolsnotifications-icon3"
            alt=""
            src="/materialsymbolsnotificationsrounded.svg"
          />
          <div className="notifications7">Notifications</div>
        </Link>
        <a className="plans9" onClick={onPlansClick}>
          <div className="plans10">Plans</div>
          <img className="mdibuilding-icon2" alt="" src="/plansicon.svg" />
        </a>
      </div>
      <img className="logo-icon1" alt="" src="/navlogo@2x.png" />
    </div>
  );
};

export default SidebarContainer;
