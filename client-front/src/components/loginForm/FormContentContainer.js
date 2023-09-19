import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SigninSchema } from "../../schemas";
import { API_URL } from "../../utils/api";
import axios from "axios";
import "./FormContentContainer.css";
const FormContentContainer = () => {
  const navigate = useNavigate();
  let error;

  const email = "";
  const password = "";

  const handleLogin = async ({}) => {
       try {
        const response = await axios.post(API_URL + "/auth/login", {
          email,
          password,
        });
        const token = response?.data?.token;
        console.log(token,"token")
        localStorage.setItem("token", token); //store token in local storage
        if (token) {
          actions.resetForm();
          //redirect to dashboard
          navigate("/home");
        } else {
          error = response?.data?.message;
        }
      } catch (error) {
        console.log("catch error", error);
      }
  }
  
  
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
      useFormik({
        initialValues: {
          email,
          password,
        },
        validationSchema: SigninSchema,
        onSubmit: (values, actions) => onSubmit(values, actions),
      });
  
  const onRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="formcontent1">
      <div className="heading1">
        <h2 className="get-your-building">Get your building plan right now!</h2>
      </div>
      <form>
        <div className="forminputs">
          <input
            className="input6"
            type="email"
            placeholder="Email address"
            required
          />
          <input
            className="input7"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="verify">
          <input
            className="material-symbolscheck-box"
            type="checkbox"
            required
          />
          <div className="keep-me-signed">{`Keep me signed in  `}</div>
        </div>
        <button className="button8" onClick={handleLogin}>
          <div className="login1">Login</div>
        </button>
        <div className="acknowledge">
          <div className="dont-have-an-account-parent">
            <div className="dont-have-an">Don’t have an account?</div>
            <a className="register" onClick={onRegisterClick}>
              Register
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormContentContainer;
