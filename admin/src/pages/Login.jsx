import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { checkLoggedIn, loginService } from "../services/auth.service";
import { ClipLoader, FadeLoader } from "react-spinners";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const check = async () => {
      const loggedIn = await checkLoggedIn();
      if (loggedIn) {
        navigate("/");
      }
    };
    check();
  });
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Please provide a valid email")
      .required("Please enter your email"),
    password: yup
      .string()
      .min(8, "The password must be atleast 8 characters")
      .max(25, "The password must be less than 25 characters")
      .required("Please enter password"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const loggedInUser = await loginService(data);
      if (!(loggedInUser instanceof Error)) {
        toast.success(loggedInUser.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };
  return (
    <div className="w-full h-full overflow-hidden">
      <Helmet>
        <title>SHDR | Login</title>
      </Helmet>
      <div className="flex flex-col md:flex-row">
        <div className="hidden md:block relative w-[50%] h-full ">
          <div className="w-full h-screen absolute bg-[#0000DA26] left-1 top-0"></div>
          <img src="/images/login.png" alt="" className="w-full h-screen" />
        </div>
        <div className="w-full md:w-[50%] bg-[#F8FCFD] h-screen flex flex-col items-center justify-center">
          <img src="/images/logo.png" alt="" className="w-[20%]" />
          <form
            className="w-[80%] md:w-[70%] lg:w-[60%]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="text-center my-3">
              <p className="text-[25px] font-semibold my-1">Welcome!</p>
              <p className="text-[#898989] text-[13px] font-medium my-1">
                Enter your credentials to get started
              </p>
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                className="border-2 rounded-lg w-full px-4 py-2 my-2 outline-none"
                {...register("email")}
              />
              <p className="text-red-500">{errors.email?.message}</p>
              <input
                type="password"
                placeholder="Password"
                className="border-2 rounded-lg w-full px-4 py-2 my-2 outline-none"
                {...register("password")}
              />
              <p className="text-red-500">{errors.password?.message}</p>
            </div>
            {loading ? (
              <button className="bg-[#005DFF]  text-white rounded-lg w-full px-4 py-2 my-2 cursor-pointer">
                <ClipLoader size={15} color="white" />
              </button>
            ) : (
              <input
                type="submit"
                value="Login"
                className="bg-[#005DFF]  text-white rounded-lg w-full px-4 py-2 my-2 cursor-pointer"
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
