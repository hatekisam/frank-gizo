import Header from "../../components/header/Header";
import FormContentContainer from "../../components/loginForm/FormContentContainer";

import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="loginpage">
      <Header />
      <div className="authcontent">
        <img
          className="authimage-icon"
          alt="Auth Image"
          src="/houseplanremovebgpreview-1@2x.png"
        />
        <FormContentContainer />
      </div>
    </div>
  );
};

export default LoginPage;
