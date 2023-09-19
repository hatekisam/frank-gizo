import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createUser } from "../services/user.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FadeLoader } from "react-spinners";
const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    fullName: yup.string().required("Please provide the name of the user"),
    email: yup
      .string()
      .email("Please provide a valid email")
      .required("Please provide the email of the user"),
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
      const user = await createUser(data);
      if (!(user instanceof Error)) {
        toast.success("Successfully created user");
        setLoading(false);
        navigate(`/users`);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error creating user");
    }
  };
  return (
    <div className="w-full h-full overflow-hidden ">
      <div className="flex">
        <div className="hidden sm:flex w-[40%] h-screen  items-center justify-center ">
          <img src="/images/createUser.png" alt="" />
        </div>
        <div className="w-full sm:w-[60%]  h-screen flex flex-col items-center justify-center">
          {loading ? (
            <div className="h-full w-full flex items-center">
              <FadeLoader color="gray" />
            </div>
          ) : (
            <>
              <p className="text-[#3F3D56] font-semibold text-left w-[70%]  text-lg">
                Add an Employee
              </p>
              <div className="w-[80%] sm:w-[70%]  px-3 ">
                <form
                  className="w-full border-y-2 py-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="my-2">
                    <p>Names</p>
                    <input
                      type="text"
                      className="px-4 py-2 border-2 outline-none rounded-lg  w-full"
                      {...register("fullName")}
                    />
                  </div>
                  <div className="my-2">
                    <p>Email</p>
                    <input
                      type="text"
                      className="px-4 py-2 border-2 outline-none rounded-lg  w-full"
                      {...register("email")}
                    />
                  </div>
                  <div className="flex gap-2 justify-end my-2 w-full">
                    <button
                      onClick={() => window.history.back()}
                      type="button"
                      className="border-2 border-[#0000DA] cursor-pointer px-4 py-2 rounded-lg text-[#0000DA] w-fit"
                    >
                      Cancel
                    </button>
                    <input
                      type="submit"
                      value="Create"
                      className="border-2 border-[#0000DA] cursor-pointer w-fit bg-[#0000DA] px-4 py-2 rounded-lg text-white"
                    />
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
