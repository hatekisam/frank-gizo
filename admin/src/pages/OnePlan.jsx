import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Switch from "react-switch";
import Modal from "react-modal"
import { fetchOneProject } from "../services/project.service";
import { FadeLoader } from "react-spinners";
const OnePlan = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (id) {
          const result = await fetchOneProject(id);
          if (!(result instanceof Error)) {
            setProject(result);
            setLoading(false);
          }
        }
      } catch (error) {
        setLoading(false);
        toast.error("Error getting info about project");
      }
    };
    fetchProducts();
  }, []);
  const [commenting, setCommenting] = useState(false);
  const handleCommenting = (value) => {
    setCommenting(value);
  };
  const property = {
    id: 4,
    buildingPlan: "Condo",
    creator: "Sarah Brown",
    price: 200000,
    image: "/images/building4.png",
    floorPlan: "/images/floorplan.png",
    roomNumber: 2,
    floorNumber: 2,
    bathRoom: 3,
    comments: [
      {
        content: "It is good",
        name: "Brooony",
      },
      {
        content: "It is good",
        name: "Brooony",
      },
      {
        content: "It is good",
        name: "Brooony",
      },
    ],
  };
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const deleteProject = () => {
    setLoading(true)
    try {
      api.delete(`/projects/${project?._id}`).then((res) => {
        toast.success("Successfully deleted project")
        setLoading(false)
        navigate("/plans")
      })
    } catch (error) {
      setLoading(false)
      toast.error("Error while deleting project")
    }
  }
  const [modalIsOpen, setIsOpen] = React.useState(false);
  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden p-5">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <p className="text-red-500 text-3xl">Delete Plan</p>
        <p className="text-gray-500">Are you sure you want to delete this project</p>
        <div className="flex justify-between my-3">
          <button onClick={() => {
            setIsOpen(false)
          }} className='px-4 py-2 rounded-md bg-gray-200 border-blue-500 border-2 text-white'>Cancel</button>
          <button onClick={deleteProject} className='px-4 py-2 rounded-md bg-red-500 text-white'>Delete</button>
        </div>
      </Modal>
      <div className="my-2">
        <div className="p-3 border-b-2 flex items-center justify-between">
          <p className="text-[#2D2D2D]  font-bold ">Plans</p>
        </div>
      </div>
      {loading ? (
        <div className="w-full flex items-center justify-center h-[400px]">
          <FadeLoader color="gray" />
        </div>
      ) : (
        <div className="p-3">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 flex gap-2 items-center text-[#555555] my-2"
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
          <div className="flex gap-2">
            <img
              src={project?.images[0]}
              alt=""
              className="w-[60%] rounded-lg"
            />
            <div className="flex gap-3 justify-center w-[40%]">
              <Link to={`/plans/${project._id}/edit`}>
                <div className="flex gap-2 items-center border-2 rounded-lg h-fit px-4 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M12.8667 5.95016L10.0333 3.15016L10.9667 2.21683C11.2222 1.96127 11.5362 1.8335 11.9087 1.8335C12.2807 1.8335 12.5944 1.96127 12.85 2.21683L13.7833 3.15016C14.0389 3.40572 14.1722 3.71416 14.1833 4.0755C14.1944 4.43638 14.0722 4.74461 13.8167 5.00016L12.8667 5.95016ZM11.9 6.9335L4.83333 14.0002H2V11.1668L9.06667 4.10016L11.9 6.9335Z"
                      fill="#555555"
                    />
                  </svg>
                  <p>Edit</p>
                </div>
              </Link>
              <button onClick={openModal} className="flex gap-2 items-center border-2 rounded-lg h-fit px-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M5.25 15.75C4.8375 15.75 4.4845 15.6033 4.191 15.3097C3.897 15.0157 3.75 14.6625 3.75 14.25V4.5H3V3H6.75V2.25H11.25V3H15V4.5H14.25V14.25C14.25 14.6625 14.1033 15.0157 13.8097 15.3097C13.5157 15.6033 13.1625 15.75 12.75 15.75H5.25ZM12.75 4.5H5.25V14.25H12.75V4.5ZM6.75 12.75H8.25V6H6.75V12.75ZM9.75 12.75H11.25V6H9.75V12.75ZM5.25 4.5V14.25V4.5Z"
                    fill="#555555"
                  />
                </svg>
                <p>Delete</p>
              </button>
            </div>
          </div>
          <div className="w-[60%] h-1 bg-[#0000DA26] rounded-full my-3"></div>
          <div>
            <p className="font-semibold my-2">{project?.category.title}</p>
            <p className="font-semibold my-2 text-[#898989]">
              ${project?.planPrice}
            </p>
            <p className="font-semibold my-2">Floor Plan</p>
            <div className="w-[50%] flex justify-around">
              <img src={property.floorPlan} alt="" />
              <div className="flex gap-2 items-center">
                <img src="/svg/room.svg" alt="" />
                <p>{project?.bedRooms + project?.livingRooms}</p>
              </div>
              <div className="flex gap-2 items-center">
                <img src="/svg/house.svg" alt="" />
                <p>{project?.numberOfFloors}</p>
              </div>
              <div className="flex gap-2 items-center">
                <img src="/svg/bathroom.svg" alt="" />
                <p>{project?.bedRooms}</p>
              </div>
            </div>
            <div>
              <p className="font-bold">Comments</p>
              <div>
                {project?.comments.slice(0, 3).map((comment, i) => {
                  return (
                    <div key={i} className="flex gap-2 text-sm">
                      <p className="text-[#005DFFB0]">{comment.name}</p>
                      <p className="">{comment.content}</p>
                    </div>
                  );
                })}
                <button className="text-sm text-[#949494] my-2">
                  View all Comments
                </button>
              </div>
            </div>
            <button className="flex gap-2 text-[#898989] items-center my-2">
              <p>Advanced Settings</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                className="rotate-90"
              >
                <path
                  d="M13.498 9.375L8.49805 4.375L3.49805 9.375"
                  stroke="#555555"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <div className="flex gap-2 items-center my-2">
              <p>Turn off commenting</p>
              <Switch
                onChange={handleCommenting}
                checked={commenting}
                uncheckedIcon={false}
                checkedIcon={false}
                width={40}
                height={20}
                handleDiameter={10}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnePlan;
