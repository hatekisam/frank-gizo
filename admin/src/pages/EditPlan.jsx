import React, { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import { Link, useParams } from 'react-router-dom'
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
        const schema = yup.object().shape({
                category: yup.string().optional(),
                name: yup.string().optional(),
                stage: yup.string().optional(),
                numberOfFloors: yup.number()
                        .optional(),
                planPrice: yup.string().optional(),
                location: yup.string().optional(),
                description: yup
                        .string().nullable()
                        .optional(),
                livingRooms: yup.number().nullable().optional(),
                washRooms: yup.number().nullable().optional(),
                bedRooms: yup.number().nullable().optional(),
        });
        const {
                register,
                handleSubmit,
                formState: { errors },
        } = useForm({
                resolver: yupResolver(schema),
        });
        const onSubmit = (data) => {
                console.log(data)
        }
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
                                                                        {...register("name")}
                                                                />
                                                                <p className="text-red-500">{errors.name?.message}</p>
                                                        </div>
                                                        <div className="my-2">
                                                                <p>Category of House Plan</p>
                                                                <select
                                                                        className="px-4 py-2 border-2 outline-none rounded-lg w-full md:w-[50%] bg-white"
                                                                        {...register("category")}
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
                                                                <p className="text-red-500">{errors.category?.message}</p>
                                                        </div>
                                                        <div className="my-2">
                                                                <p>Number of Floors</p>
                                                                <input
                                                                        type="number"
                                                                        className="px-4 py-2 border-2 outline-none rounded-lg w-full md:w-[50%]"
                                                                        {...register("numberOfFloors")}
                                                                        defaultValue={project?.numberOfFloors}
                                                                        placeholder={project.numberOfFloors}
                                                                />
                                                                <p className="text-red-500">{errors.numberOfFloors?.message}</p>
                                                        </div>
                                                        <div className="my-2">
                                                                <p>Plan Stage</p>
                                                                <select
                                                                        className="px-4 py-2 border-2 outline-none rounded-lg w-full md:w-[50%] bg-white"
                                                                        {...register("stage")}
                                                                >
                                                                        <option value={project.stage === "DESIGN" ? "DESIGN" : project.stage === "COMPLETE" ? "COMPLETE" : "CONSTRUCTION"} disabled selected>{project.stage}</option>
                                                                        <option value={"DESIGN"}>Design</option>
                                                                        <option value={"CONSTRUCTION"}>Construction</option>
                                                                        <option value={"COMPLETE"}>Completed</option>
                                                                </select>
                                                                <p className="text-red-500">{errors.stage?.message}</p>
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
                                                                        />
                                                                        <input
                                                                                type="number"
                                                                                className="px-4 py-2 border-2 outline-none rounded-lg "
                                                                                placeholder={project.washRooms ? project.washRooms : "Wash Rooms"}
                                                                                defaultValue={project?.washRooms}
                                                                                {...register("washRooms")}
                                                                        />
                                                                        <input
                                                                                type="number"
                                                                                className="px-4 py-2 border-2 outline-none rounded-lg "
                                                                                placeholder={project.bedRooms ? project.bedRooms : "Bed Rooms"}
                                                                                defaultValue={project?.bedRooms}
                                                                                {...register("bedRooms")}
                                                                        />
                                                                        <p>{errors?.livingRooms?.message}</p>
                                                                </div>
                                                        </div>
                                                        <div className="my-2">
                                                                <p>Price in (USD)</p>
                                                                <input
                                                                        type="text"
                                                                        className="px-4 py-2 border-2 outline-none rounded-lg w-full md:w-[50%]"
                                                                        {...register("planPrice")}
                                                                        placeholder={project.planPrice}
                                                                        defaultValue={project.planPrice}
                                                                />
                                                                <p className="text-red-500">{errors.planPrice?.message}</p>
                                                        </div>
                                                        <div className="my-2">
                                                                <p>Location</p>
                                                                <input
                                                                        type="text"
                                                                        className="px-4 py-2 border-2 outline-none rounded-lg w-full md:w-[50%]"
                                                                        {...register("location")}
                                                                        placeholder={project.location}
                                                                        defaultValue={project.location}
                                                                />
                                                                <p className="text-red-500">{errors.location?.message}</p>
                                                        </div>
                                                        <div className="my-2">
                                                                <p>Description</p>
                                                                <textarea
                                                                        className="px-4 py-2 border-2 outline-none rounded-lg w-full md:w-[50%]"
                                                                        {...register("description")}
                                                                        placeholder={project.description}
                                                                        defaultValue={project?.description}
                                                                ></textarea>
                                                                <p className="text-red-500">{errors.description?.message}</p>
                                                        </div>
                                                        <div>
                                                                <p>Images</p>
                                                                <div className="grid grid-cols-1 md:grid-cols-3 lg:gric-cols-4 gap-4">
                                                                        {project?.images.map((img, index) => {
                                                                                console.log(img)
                                                                                return (
                                                                                        <div key={index} className='relative p-4 rounded-md border-gray-700 border-2 h-[350px]'>
                                                                                                <img src={img} alt="" className='w-full  h-full' />
                                                                                                <button className="absolute -right-4 -bottom-2 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full ">
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
                                                                                className="w-[50%] px-4 py-2  my-8 outline-none rounded-lg  bg-[#005DFF] text-white cursor-pointer"
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