import React, { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';
import { fetchOneProject } from '../services/project.service';
import { TrashIcon } from '@heroicons/react/outline';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { api } from '../config/axios';


const EditPlan = () => {
        const { id } = useParams();
        const [loading, setLoading] = useState(true);
        const [categories, setCategories] = useState();
        const [project, setProject] = useState();
        const [updatedProject, setUpdatedProject] = useState()
        useEffect(() => {
                const fetchProducts = async () => {
                        try {
                                if (id) {
                                        const result = await fetchOneProject(id);
                                        console.log(id)
                                        console.log(result)
                                        if (!(result instanceof Error)) {
                                                api
                                                        .get("/project-categories")
                                                        .then((res) => {
                                                                console.log(res.data.data.categories);
                                                                setCategories(res.data.data.categories);
                                                                setLoading(false);
                                                        })
                                                        .catch((err) => {
                                                                window.location.reload();
                                                        });
                                                setProject(result);
                                                setUpdatedProject(result)
                                                setLoading(false);
                                        }
                                }
                        } catch (error) {
                                toast.error("Error getting info about project");
                                setLoading(false);
                        }
                };
                fetchProducts();
        }, []);
        const navigate = useNavigate();
        const {
                register,
                handleSubmit,
        } = useForm();
        const onSubmit = (data) => {
                setLoading(true);
                api.patch(`/projects/${project._id}`, updatedProject).then((res) => {
                        setLoading(false)
                        window.history.back();
                        toast.success("Successfully updated project")
                }).catch((err) => {
                        console.log(err)
                        setLoading(false)
                        toast.error("Error updating project")
                })
        }
        const removeImage = (indexToRemove) => {
                const updatedImages = project?.images.filter((img, index) => index !== indexToRemove);
                setProject({ ...project, images: updatedImages });
        };
        const handleChange = (e) => {
                const { name, value } = e.target;
                setUpdatedProject({
                        ...updatedProject,
                        [name]: value,
                });
        };
        const isProjectModified = () => {
                return JSON.stringify(project) !== JSON.stringify(updatedProject);
        };
        return (
                <div className='w-full h-full px-4 pt-20 overflow-y-auto'>
                        <TopBar title="Edit" />
                        {loading ? (
                                <div className='h-full w-full flex items-center justify-center'>
                                        <ClipLoader color='gray' size={50} />
                                </div>
                        ) : (
                                <div>
                                        <div>
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                        <div className="my-2">
                                                                <p>Enter plan Name</p>
                                                                <input
                                                                        type="text"
                                                                        placeholder={project.name}
                                                                        defaultValue={project.name}
                                                                        className="px-4 py-2 border-2 outline-none rounded-lg w-full md:w-[50%]"
                                                                        {...register("name")} onChange={handleChange}
                                                                />
                                                        </div>
                                                        <div className="my-2">
                                                                <p>Category of House Plan</p>
                                                                <select
                                                                        className="px-4 py-2 border-2 outline-none rounded-lg w-full md:w-[50%] bg-white"
                                                                        {...register("category")}
                                                                        onChange={handleChange}
                                                                ><option value={project.category._id} disabled selected>
                                                                                {project.category.title}
                                                                        </option>
                                                                        {categories?.map((category, i) => {
                                                                                return (
                                                                                        <option key={i} value={category._id}>
                                                                                                {category.title}
                                                                                        </option>
                                                                                );
                                                                        })}
                                                                </select>
                                                        </div>
                                                        <div className="my-2">
                                                                <p>Number of Floors</p>
                                                                <input
                                                                        type="number"
                                                                        className="px-4 py-2 border-2 outline-none rounded-lg w-full md:w-[50%]"
                                                                        {...register("numberOfFloors")}
                                                                        onChange={handleChange}
                                                                        defaultValue={project?.numberOfFloors}
                                                                        placeholder={project.numberOfFloors}
                                                                />
                                                        </div>
                                                        <div className="my-2">
                                                                <p>Plan Stage</p>
                                                                <select
                                                                        className="px-4 py-2 border-2 outline-none rounded-lg w-full md:w-[50%] bg-white"
                                                                        {...register("stage")}
                                                                        onChange={handleChange}
                                                                >
                                                                        <option value={project.stage === "DESIGN" ? "DESIGN" : project.stage === "COMPLETE" ? "COMPLETE" : "CONSTRUCTION"} disabled selected>{project.stage}</option>
                                                                        <option value={"DESIGN"}>Design</option>
                                                                        <option value={"CONSTRUCTION"}>Construction</option>
                                                                        <option value={"COMPLETE"}>Completed</option>
                                                                </select>
                                                        </div>
                                                        <div className="my-2">
                                                                <p>Number of Rooms (Optional)</p>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
                                                                        <input
                                                                                type="number"
                                                                                className="px-4 py-2 border-2 outline-none rounded-lg "
                                                                                placeholder={project.livingRooms ? project.livingRooms : "Living Rooms"}
                                                                                defaultValue={project?.livingRooms}
                                                                                {...register("livingRooms")}
                                                                                onChange={handleChange}
                                                                        />
                                                                        <input
                                                                                type="number"
                                                                                className="px-4 py-2 border-2 outline-none rounded-lg "
                                                                                placeholder={project.washRooms ? project.washRooms : "Wash Rooms"}
                                                                                defaultValue={project?.washRooms}
                                                                                {...register("washRooms")}
                                                                                onChange={handleChange}
                                                                        />
                                                                        <input
                                                                                type="number"
                                                                                className="px-4 py-2 border-2 outline-none rounded-lg "
                                                                                placeholder={project.bedRooms ? project.bedRooms : "Bed Rooms"}
                                                                                defaultValue={project?.bedRooms}
                                                                                {...register("bedRooms")}
                                                                                onChange={handleChange}
                                                                        />
                                                                </div>
                                                        </div>
                                                        <div className="my-2">
                                                                <p>Price in (USD)</p>
                                                                <input
                                                                        type="text"
                                                                        className="px-4 py-2 border-2 outline-none rounded-lg w-full md:w-[50%]"
                                                                        {...register("planPrice")}
                                                                        onChange={handleChange}
                                                                        placeholder={project.planPrice}
                                                                        defaultValue={project.planPrice}
                                                                />
                                                        </div>
                                                        <div className="my-2">
                                                                <p>Location</p>
                                                                <input
                                                                        type="text"
                                                                        className="px-4 py-2 border-2 outline-none rounded-lg w-full md:w-[50%]"
                                                                        {...register("location")}
                                                                        onChange={handleChange}
                                                                        placeholder={project.location}
                                                                        defaultValue={project.location}
                                                                />
                                                        </div>
                                                        <div className="my-2">
                                                                <p>Description</p>
                                                                <textarea
                                                                        className="px-4 py-2 border-2 outline-none rounded-lg w-full md:w-[50%]"
                                                                        {...register("description")}
                                                                        onChange={handleChange}
                                                                        placeholder={project.description}
                                                                        defaultValue={project?.description}
                                                                ></textarea>
                                                        </div>
                                                        <div>
                                                                <p>Images</p>
                                                                <div className="grid grid-cols-1 md:grid-cols-3 lg:gric-cols-4 gap-4">
                                                                        {project?.images.map((img, index) => {
                                                                                console.log(img)
                                                                                return (
                                                                                        <div key={index} className='relative p-4 rounded-md border-gray-700 border-2 h-[350px]'>
                                                                                                <img src={img} alt="" className='w-full  h-full' />
                                                                                                <button onClick={() => {
                                                                                                        removeImage(index)
                                                                                                }} className="absolute -right-4 -bottom-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full ">
                                                                                                        <TrashIcon className="w-5 h-5" />
                                                                                                </button>
                                                                                        </div>
                                                                                )
                                                                        })}
                                                                </div>
                                                                <p className='mt-5'>Videos</p>
                                                                <div className="grid grid-cols-1 md:grid-cols-3 lg:gric-cols-4 gap-4">
                                                                        {project?.videos?.map((videoUrl, index) => {
                                                                                return (
                                                                                        <video controls key={index}>
                                                                                                <source src={videoUrl} type="video/mp4" />
                                                                                                Your browser does not support the video tag.
                                                                                        </video>
                                                                                );
                                                                        })}
                                                                </div>
                                                                <p className='mt-5'>Documents</p>
                                                                <div className="grid grid-cols-1 md:grid-cols-3 lg:gric-cols-4 gap-4">
                                                                        {project?.documents?.map((doc, index) => {
                                                                                return (
                                                                                        <div className="relative">
                                                                                                <a href={doc} key={index} download>
                                                                                                        <div className="border border-gray-300 p-2 cursor-pointer">
                                                                                                                {/* Display a document icon or name */}
                                                                                                                <span className="text-gray-700">{`Document ${index + 1
                                                                                                                        }`}</span>
                                                                                                        </div>

                                                                                                </a>
                                                                                                <button className="absolute -right-4 -bottom-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full ">
                                                                                                        <TrashIcon className="w-5 h-5" />
                                                                                                </button>
                                                                                        </div>
                                                                                );
                                                                        })}
                                                                </div>
                                                        </div>
                                                        <div className='flex gap-2 items-center w-[50%]'>
                                                                <button onClick={() => window.history.back()} className="px-4 py-2 rounded-md border-2 w-[50%]">
                                                                        Cancel
                                                                </button>
                                                                {loading ? (
                                                                        <button className="w-[50%] bg-[#005DFF]  text-white rounded-lg px-4 py-2 my-2 cursor-pointer outline-none">
                                                                                <ClipLoader size={15} color="white" />
                                                                        </button>
                                                                ) : (
                                                                        <input
                                                                                type="submit"
                                                                                value={"Update"}
                                                                                disabled={!isProjectModified()}
                                                                                className="w-[50%] px-4 py-2  my-8 outline-none rounded-lg  bg-[#005DFF] text-white cursor-pointer disabled:bg-blue-400"
                                                                        />
                                                                )}
                                                        </div>
                                                </form>
                                        </div>
                                </div>
                        )}
                </div>
        )
}

export default EditPlan