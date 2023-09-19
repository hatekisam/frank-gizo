import React from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
import { yupResolver } from "@hookform/resolvers/yup"

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createFolder } from "../services/gallery.service";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateFolder = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Please provide the name of the folder"),
    description: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const folder = await createFolder(data);
      if (!(folder instanceof Error)) {
        toast.success("Successfully created folder");
        navigate(`/gallery/folders/${folder.id}`);
      }
    } catch (error) {
      toast.error("Error creating folder");
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden p-5">
      <div className="my-2">
        <div className="p-3 border-b-2 flex items-center justify-between">
          <p className="text-[#2D2D2D]  font-bold ">Gallery</p>
        </div>
      </div>
      <div className="p-3">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 flex gap-2 items-center text-[#555555]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M15.8335 9.16657H5.95016L8.97516 5.53324C9.11661 5.36306 9.18466 5.14366 9.16435 4.92330C9.14403 4.70295 9.03701 4.49969 8.86683 4.35824C8.69665 4.21679 8.47725 4.14874 8.25689 4.16905C8.03654 4.18937 7.83328 4.29639 7.69183 4.46657L3.52516 9.46657C3.49713 9.50634 3.47206 9.54812 3.45016 9.59157C3.45016 9.63324 3.45016 9.65824 3.39183 9.69990C3.35406 9.79545 3.33428 9.89716 3.3335 9.99990C3.33428 10.1026 3.35406 10.2044 3.39183 10.29990C3.39183 10.3416 3.39183 10.3666 3.45016 10.40820C3.47206 10.4517 3.49713 10.4935 3.52516 10.53320L7.69183 15.53320C7.77018 15.6273 7.8683 15.7030 7.9792 15.7548C8.09011 15.8067 8.21107 15.8334 8.3335 15.8332C8.52821 15.8336 8.71690 15.7658 8.86683 15.6416C8.95121 15.5716 9.02096 15.4857 9.07209 15.3887C9.12322 15.2918 9.15471 15.1857 9.16478 15.0765C9.17484 14.9674 9.16327 14.8573 9.13073 14.7527C9.09820 14.6480 9.04533 14.5508 8.97516 14.4666L5.95016 10.8332H15.8335C16.0545 10.8332 16.2665 10.7454 16.4228 10.5892C16.5790 10.4329 16.6668 10.2209 16.6668 9.9999C16.6668 9.7789 16.5790 9.5669 16.4228 9.4106C16.2665 9.2544 16.0545 9.1666 15.8335 9.1666Z"
              fill="#555555"
            />
          </svg>
          <p>Back</p>
        </button>
        <div className="my-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2">
              <p>Folder Name</p>
              <input
                type="text"
                className="px-4 py-2 border-2 outline-none rounded-lg w-[50%]"
                {...register("name")}
              />
            </div>
            <p className="text-red-500">{errors.name?.message}</p>
            <div className="my-2">
              <p>Folder Description</p>
              <textarea
                className="px-4 py-2 border-2 outline-none rounded-lg w-[50%]"
                {...register("description")}
              ></textarea>
            </div>
            <input
              type="submit"
              value={"Create"}
              className="px-4 py-2  my-2 outline-none rounded-lg  bg-[#005DFF] text-white cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFolder;
