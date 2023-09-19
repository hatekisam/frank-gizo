import { useNavigate } from "react-router-dom";
import FormContentWrapper from "../../components/FormContentWrapper";
import "./RegisterPage.css";
const RegisterPage = () => {
  const onButtonClick = () => {
    navigate("/login");
  };

  return (
    <div className="registerpage">
      <div className="authcontent1">
        <img
          className="authimage-icon1"
          alt="Auth image"
          src="/houseplanremovebgpreview-11@2x.png"
        />
        <FormContentWrapper />
      </div>
    </div>
  );
};

export default RegisterPage;
