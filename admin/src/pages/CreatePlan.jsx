import React from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Switch from "react-switch";
import * as yup from "yup";
import { api } from "../config/axios";
import { ClipLoader, FadeLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatePlan = () => {


	const [loading, setLoading] = useState(true);
	const [images, setImages] = useState([]);
	const [documents, setDocuments] = useState([]);
	const [video, setVideo] = useState();
	const handleImage = (e) => {
		const file = e.target.files[0];
		setImageToBase(file);
	};

	const setImageToBase = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImages((prevImages) => [...prevImages, reader.result]);
		};
	};
	const handleDoc = (e) => {
		const file = e.target.files[0];
		setDocToBase(file);
	};

	const setDocToBase = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setDocuments((prev) => [...prev, reader.result]);
		};
	};
	const handleVid = (e) => {
		const file = e.target.files[0];
		setVidToBase(file);
	};

	const setVidToBase = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setVideo(reader.result);
		};
	};
	const [imagesLength, setImagesLength] = useState(1);
	const renderImageInputs = () => {
		const inputElements = [];
		for (let i = 0; i < imagesLength; i++) {
			inputElements.push(
				<div className="w-full my-2">
					<input
						key={i}
						type="file"
						accept="image/*"
						className="px-4 py-2 border-2 outline-none rounded-lg w-[50%] bg-[#E2DDDD]"
						onChange={handleImage}
					/>
				</div>
			);
		}
		return inputElements;
	};
	const [documentsLength, setDocumentsLength] = useState(1);
	const renderDocumentInputs = () => {
		const inputElements = [];
		for (let i = 0; i < documentsLength; i++) {
			inputElements.push(
				<div className="w-full my-2">
					<input
						key={i}
						type="file"
						accept=".pdf,.txt"
						className="px-4 py-2 border-2 outline-none rounded-lg w-[50%] bg-[#E2DDDD]"
						onChange={handleDoc}
					/>
				</div>
			);
		}
		return inputElements;
	};
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		api
			.get("/project-categories")
			.then((res) => {
				console.log(res);
				setCategories(res.data.data.categories);
				setLoading(false);
			})
			.catch((err) => {
				window.location.reload();
			});
	}, []);
	const schema = yup.object().shape({
		category: yup.string().required("Please select the category"),
		name: yup.string().required("Please provide the plan name"),
		stage: yup.string().required("Please select the stage of the plan"),
		numberOfFloors: yup
			.number()
			.required("Please provide the number of Floors"),
		planPrice: yup.string().required("Please provide the price of the plan"),
		location: yup.string().required("Please provide the location of the plan"),
		description: yup
			.string()
			.required("Please provide the description of the plan"),
		livingRooms: yup.number().notRequired(),
		washRooms: yup.number().notRequired(),
		bedRooms: yup.number().notRequired(),
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
		setLoading(true);
		const id = await localStorage.getItem("uid");
		const formData = {
			category: data.category,
			numberofFloors: data.numberOfFloors,
			planPrice: data.planPrice,
			location: data.location,
			description: data.description,
			livingRooms: data.livingRooms,
			washRooms: data.washRooms,
			bedRooms: data.bedRooms,
			name: data.name,
			stage: data.stage,
			images,
			video,
			documents,
			creator: id,
		};
		try {
			const response = await api.post("/projects", formData, {});
			toast.success("Successfully created project");
			setLoading(false);
			navigate("/plans");
		} catch (error) {
			setLoading(false);
			toast.error("Creating project failed");
		}
	};
	return (
		<div className="w-full h-full overflow-y-auto overflow-x-hidden p-5">
			<div className="my-2">
				<div className="p-3 border-b-2 flex items-center justify-between">
					<p className="text-[#2D2D2D]  font-bold ">Plans</p>
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
							d="M15.8335 9.16657H5.95016L8.97516 5.53324C9.11661 5.36306 9.18466 5.14366 9.16435 4.9233C9.14403 4.70295 9.03701 4.49969 8.86683 4.35824C8.69665 4.21679 8.47725 4.14874 8.25689 4.16905C8.03654 4.18937 7.83328 4.29639 7.69183 4.46657L3.52516 9.46657C3.49713 9.50634 3.47206 9.54812 3.45016 9.59157C3.45016 9.63324 3.45016 9.65824 3.39183 9.6999C3.35406 9.79545 3.33428 9.89716 3.3335 9.9999C3.33428 10.1026 3.35406 10.2044 3.39183 10.2999C3.39183 10.3416 3.39183 10.3666 3.45016 10.4082C3.47206 10.4517 3.49713 10.4935 3.52516 10.5332L7.69183 15.5332C7.77018 15.6273 7.8683 15.703 7.9792 15.7548C8.09011 15.8067 8.21107 15.8334 8.3335 15.8332C8.52821 15.8336 8.7169 15.7658 8.86683 15.6416C8.95121 15.5716 9.02096 15.4857 9.07209 15.3887C9.12322 15.2918 9.15471 15.1857 9.16478 15.0765C9.17484 14.9674 9.16327 14.8573 9.13073 14.7527C9.0982 14.648 9.04533 14.5508 8.97516 14.4666L5.95016 10.8332H15.8335C16.0545 10.8332 16.2665 10.7454 16.4228 10.5892C16.579 10.4329 16.6668 10.2209 16.6668 9.9999C16.6668 9.77889 16.579 9.56693 16.4228 9.41065C16.2665 9.25437 16.0545 9.16657 15.8335 9.16657Z"
							fill="#555555"
						/>
					</svg>
					<p>Back</p>
				</button>
				<div className="my-2">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="my-2">
							<p>Enter plan Name</p>
							<input
								type="text"
								className="px-4 py-2 border-2 outline-none rounded-lg w-[50%]"
								{...register("name")}
							/>
							<p className="text-red-500">{errors.name?.message}</p>
						</div>
						<div className="my-2">
							<p>Choose Category of House Plan</p>
							<select
								className="px-4 py-2 border-2 outline-none rounded-lg w-[50%] bg-white"
								{...register("category")}
							>
								{categories.map((category, i) => {
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
							<p>Enter number of Floors</p>
							<input
								type="number"
								className="px-4 py-2 border-2 outline-none rounded-lg w-[50%]"
								{...register("numberOfFloors")}
							/>
							<p className="text-red-500">{errors.numberOfFloors?.message}</p>
						</div>
						<div className="my-2">
							<p>Enter number of Rooms (Optional)</p>
							<div className="flex gap-2">
								<input
									type="number"
									className="px-4 py-2 border-2 outline-none rounded-lg "
									placeholder="Living Rooms"
									{...register("livingRooms")}
								/>
								<input
									type="number"
									className="px-4 py-2 border-2 outline-none rounded-lg "
									placeholder="Wash Rooms"
									{...register("washRooms")}
								/>
								<input
									type="number"
									className="px-4 py-2 border-2 outline-none rounded-lg "
									placeholder="BedRooms"
									{...register("bedRooms")}
								/>
							</div>
						</div>
						<div className="my-2">
							<p>Plan Stage</p>
							<select
								className="px-4 py-2 border-2 outline-none rounded-lg w-[50%] bg-white"
								{...register("stage")}
							>
								<option value={"DESIGN"}>Design</option>
								<option value={"CONSTRUCTION"}>Construction</option>
								<option value={"COMPLETE"}>Completed</option>
							</select>
							<p className="text-red-500">{errors.stage?.message}</p>
						</div>
						<div className="my-2">
							<p>Enter plan Price in (USD)</p>
							<input
								type="text"
								className="px-4 py-2 border-2 outline-none rounded-lg w-[50%]"
								{...register("planPrice")}
							/>
							<p className="text-red-500">{errors.planPrice?.message}</p>
						</div>
						<div className="my-2">
							<p>Location</p>
							<input
								type="text"
								className="px-4 py-2 border-2 outline-none rounded-lg w-[50%]"
								{...register("location")}
							/>
							<p className="text-red-500">{errors.location?.message}</p>
						</div>
						<div className="my-2">
							<p>Enter plan Description</p>
							<textarea
								className="px-4 py-2 border-2 outline-none rounded-lg w-[50%]"
								{...register("description")}
							></textarea>
							<p className="text-red-500">{errors.description?.message}</p>
						</div>
						<div className="my-2">
							<p>Upload visual elements:</p>

							<div className="flex flex-col gap-1">
								<p>Project Images</p>
								<div>{renderImageInputs()}</div>
								<button
									type="button"
									onClick={() => {
										setImagesLength(imagesLength + 1);
									}}
									className="my-2 bg-gray-300 w-fit px-4 py-2 rounded-md"
								>
									Add Image
								</button>
								<p>Project Video</p>
								<input
									type="file"
									accept="video/*"
									className=" px-4 py-2 border-2 outline-none rounded-lg w-[50%] bg-[#E2DDDD]"
									onChange={handleVid}
								/>
								<p>Project Documents</p>
								<div>{renderDocumentInputs()}</div>
								<button
									type="button"
									onClick={() => {
										setDocumentsLength(documentsLength + 1);
									}}
									className="my-2 bg-gray-300 w-fit px-4 py-2 rounded-md"
								>
									Add Document
								</button>
							</div>
						</div>

						{loading ? (
							<button className="w-[50%] bg-[#005DFF]  text-white rounded-lg px-4 py-2 my-2 cursor-pointer outline-none">
								<ClipLoader size={15} color="white" />
							</button>
						) : (
							<input
								type="submit"
								value={"Create"}
								className="w-[50%] px-4 py-2  my-8 outline-none rounded-lg  bg-[#005DFF] text-white cursor-pointer"
							/>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreatePlan;
