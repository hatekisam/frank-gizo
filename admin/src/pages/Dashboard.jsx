import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Modal from 'react-modal';
import { fetchAllProjects } from "../services/project.service";
import { toast } from "react-hot-toast";
import { ClipLoader, FadeLoader } from "react-spinners";
import { api } from "../config/axios";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";
import TopBar from "../components/TopBar";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState();
  const [filterCriteria, setFilterCriteria] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
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
  const [inModelLoading, setINLoading] = useState(false)
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
  const deleteProject = async () => {
    setINLoading(true)
    const token = await localStorage.getItem('token')
    try {
      api.delete(`/projects/${toDel}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res)
        toast.success("Successfully deleted project")
        setINLoading(false)
        closeModal()
      })
    } catch (error) {
      console.log(error)
      setINLoading(false)
      closeModal()
      toast.error("Error while deleting project")
    }
  }

  const filterOptions = [
    { value: "all", label: "Show All" },
    { value: "DESIGN", label: "Design" },
    { value: "COMPLETE", label: "Complete" },
    // Add more filter options as needed
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = await localStorage.getItem('token')
        const id = await localStorage.getItem("uid");
        api.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((res) => {
          setUser(res.data.data.user);
        });
        const result = await fetchAllProjects();
        if (Array.isArray(result)) {
          setProjects(result);
        }
        setLoading(false);
      } catch (error) {
        toast.error("Error Getting All Projects");
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  const [toDel, setToDel] = useState("")
  const filterProjects = (criteria) => {
    if (criteria === "all") {
      return projects;
    }
    return projects.filter((project) => project.stage === criteria);
  };

  const filteredProjects = filterProjects(filterCriteria);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const searchFilteredProjects = () => {
    return filteredProjects.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const displayProjects = searchQuery
    ? searchFilteredProjects()
    : filteredProjects;
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
          }} className='px-4 py-2 rounded-md  border-blue-500 border-2 text-blue-500'>Cancel</button>
          <button onClick={deleteProject} className='px-4 py-2 rounded-md bg-red-500 text-white'>{!inModelLoading ? "Delete" : <ClipLoader color="white" size={15} />}</button>
        </div>
      </Modal>
      <Helmet>
        <title>SHDR | Admin</title>
      </Helmet>
      {loading ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <FadeLoader color="gray" />
        </div>
      ) : (
        <div>

          <div className="p-3 my-2">
            <TopBar title="Overview" />
            <div className="flex flex-row flex-col sm:flex-row justify-between mt-6 sm:mt-24 gap-2 sm:gap-12">
              <div className="border-2 rounded-md p-4 flex-1 sm:flex-[0.3]">
                <div className="flex items-start gap-4">
                  <img src="/svg/upload.svg" alt="Upload" />
                  <p className="font-medium text-md text-[#898989]">
                    Daily {user?.role === "ADMIN" && "Total"} Uploads
                  </p>
                </div>
                <p className="text-[30px] font-bold text-center my-2">
                  {
                    projects.filter((project) => {
                      const projectDate = new Date(project.createdAt);
                      const today = new Date();
                      return (
                        projectDate.toISOString().slice(0, 10) ===
                        today.toISOString().slice(0, 10)
                      );
                    }).length
                  }
                </p>
              </div>

              <div className="border-2 rounded-lg p-4 flex-1 sm:flex-[0.3]">
                <div className="flex items-start gap-4">
                  <img src="/svg/upload.svg" alt="Upload" />
                  <p className="font-medium text-md text-[#898989]">
                    Monthly {user?.role == "ADMIN" && "Total"} Uploads
                  </p>
                </div>
                <p className="text-[30px] font-bold text-center my-2">
                  {
                    projects.filter(
                      (p) =>
                        new Date(p.createdAt).getMonth() ===
                        new Date().getMonth()
                    ).length
                  }
                </p>
              </div>
              <div className="border-2 rounded-md p-4 flex-1 sm:flex-[0.3]">
                <div className="flex items-start gap-4">
                  <img src="/svg/upload.svg" alt="Upload" />
                  <p className="font-medium text-md text-[#898989]">
                    Total {user?.role === "ADMIN" && "Total"} Uploads
                  </p>
                </div>
                <p className="text-[30px] font-bold text-center my-2">
                  {projects.length}
                </p>
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="h-[8vh] border-b-2 flex flex-row justify-between items-center w-[98%] my-4 sm:my-8 ">
              <p className="text-[#005DFF] md:text-md text-md font-bold ">
                Details table
              </p>
              <div className="flex justify-end mt-4 sm:mt-0 space-x-4">
                <div className="flex items-center space-x-2">
                  <label htmlFor="searchQuery" className="text-[#898989]">
                    Search:
                  </label>
                  <input
                    type="text"
                    id="searchQuery"
                    name="searchQuery"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search projects..."
                    className="border border-gray-300 rounded p-1"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="filterCriteria" className="text-[#898989]">
                    Filter by:
                  </label>
                  <select
                    id="filterCriteria"
                    name="filterCriteria"
                    value={filterCriteria}
                    onChange={(e) => setFilterCriteria(e.target.value)}
                    className="border border-gray-300 rounded p-1"
                  >
                    {filterOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {user?.role === "ADMIN" ? (
              <div>
                {displayProjects.length === 0 ? (
                  <Error name="projects" />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="text-left py-2 text-[#898989]">
                            Category
                          </th>
                          <th className="text-left py-2 text-[#898989]">
                            Client
                          </th>
                          <th className="text-left py-2 text-[#898989]">
                            Stage
                          </th>
                          <th className="text-left py-2 text-[#898989] ">
                            Uploaded by
                          </th>
                          <th className="text-left py-2 text-[#898989]">
                            Price
                          </th>
                          <th className="text-left py-2 text-[#898989]">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayProjects.map((project) => (
                          <tr key={project._id} className="border-b text-sm">
                            <td className="py-2">{project.category.title}</td>
                            <td className="py-2 ">{project.name}</td>
                            <td className="py-2 ">
                              {project.stage === "DESIGN" && (
                                <div className="bg-yellow-400 rounded p-1 text-center text-white text-sm w-20">
                                  <span>Design</span>
                                </div>
                              )}
                              {project.stage === "COMPLETE" && (
                                <div className="bg-green-400 rounded p-1 text-center text-white text-sm w-20">
                                  <span>Complete</span>
                                </div>
                              )}
                              {project.stage === "CONSTRUCTION" && (
                                <div className="bg-red-400 rounded p-1 text-center text-white text-sm w-20">
                                  <span>On Hold</span>
                                </div>
                              )}
                              {project.stage === "IMPLEMENTATION" && (
                                <div className="bg-orange-300 rounded p-1 text-center text-white text-sm w-20">
                                  <span>Implementation</span>
                                </div>
                              )}
                            </td>
                            <td className="py-2 ">
                              {project.uploadedBy.email}
                            </td>

                            <td className="py-2">
                              <div className="bg-violet-500 text-white py-1 px-2 rounded inline-flex items-center">
                                <span className="text-sm font-semibold">$</span>
                                <span className="text-sm font-semibold">
                                  {project.planPrice.toLocaleString()}
                                </span>
                              </div>
                            </td>
                            <td className="py-2  flex gap-2">
                              <Link to={`/plans/${project._id}`} >
                                <div className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md mx-1 w-fit">
                                  <EyeIcon className="w-5 h-5" />
                                </div>

                              </Link>
                              <Link to={`/plans/${project._id}/edit`}>
                                <div className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md mx-1">
                                  <PencilIcon className="w-5 h-5" />
                                </div>
                              </Link>
                              <button onClick={() => {
                                setIsOpen(true)
                                setToDel(project._id)
                              }} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md mx-1">
                                <TrashIcon className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {displayProjects.filter((p) => p.uploadedBy._id == user?._id)
                  .length === 0 ? (
                  <Error name="projects" />
                ) : (
                  <table className="w-full mt-4">
                    <thead>
                      <tr>
                        <th className="text-left py-2">ID</th>
                        <th className="text-left py-2">Building Plan</th>
                        <th className="text-left py-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayProjects
                        .filter((p) => p.uploadedBy._id == user?._id)
                        .sort((a, b) => {
                          const dateA = new Date(a.updatedDate);
                          const dateB = new Date(b.updatedDate);
                          return dateB - dateA;
                        })
                        .map((project) => (
                          <tr key={project._id} className="border-b">
                            <td className="py-2 w-[30%] ">{project._id}</td>
                            <td className="py-2">{project.category.title}</td>
                            <td className="py-2">
                              ${project.planPrice.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
