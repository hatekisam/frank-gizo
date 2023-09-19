import * as yup from "yup";

const passwordRules = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
// MIN 5 CHARACTERS, 1 UPPER CASE, 1 LOWER CASE, 1 NUMERIC DIGIT
export const SignupSchema = yup.object().shape({
  fullName: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const SigninSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .required("Required"),
});
