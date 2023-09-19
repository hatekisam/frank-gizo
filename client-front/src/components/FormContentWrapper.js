import { useNavigate } from "react-router-dom";
import "./FormContentWrapper.css";
const FormContentWrapper = () => {
  const navigate = useNavigate();

  const onLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="formcontent2">
      <div className="heading2">
        <h2 className="get-the-building">Get the building plan you deserve!</h2>
      </div>
      <div className="forminputs1">
        <input
          className="input8"
          type="text"
          placeholder="Full Name"
          required
        />
        <input
          className="input9"
          type="email"
          placeholder="Email address"
          required
        />
        <input
          className="input10"
          type="password"
          placeholder="Password"
          required
        />
        <input
          className="input11"
          type="password"
          placeholder="Confirm Password"
          required
        />
      </div>
      <div className="verify1">
        <input
          className="material-symbolscheck-box1"
          type="checkbox"
          required
        />
        <div className="by-clicking-you">{`By clicking, you agree to the Terms & conditions.`}</div>
      </div>
      <button className="button9">
        <div className="register1">Register</div>
      </button>
      <div className="acknowledge1">
        <div className="already-have-an-account-parent">
          <div className="already-have-an">Already have an account?</div>
          <a className="login2" onClick={onLoginClick}>
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default FormContentWrapper;
