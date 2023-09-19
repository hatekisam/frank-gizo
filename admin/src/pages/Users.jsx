import React from "react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { fetchAllUsers } from "../services/user.service";
import { FadeLoader } from "react-spinners";
import Error from "../components/Error";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await fetchAllUsers();
        if (Array.isArray(result)) {
          setUsers(result);
          setLoading(false);
        }
      } catch (error) {
        toast.error("Error Getting All Users");
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden p-5">
      <Helmet>
        <title>SHDR | Users</title>
      </Helmet>
      <div className="p-3">
        <div className="p-3 border-b-2 flex items-center justify-between">
          <p className="text-[#2D2D2D]  font-bold ">Users</p>
          <Link to={"/users/create"} className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M6 10V6M6 6V2M6 6H10M6 6H2"
                stroke="#555555"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <p className="text-[#555555] font-semibold">Add User</p>
          </Link>
        </div>
        <div>
          {loading ? (
            <div className="w-full h-[300px] flex items-center justify-center">
              <FadeLoader color="gray" />
            </div>
          ) : (
            <div>
              {users.length === 0 ? (
                <Error name="users" />
              ) : (
                <div
                  className={clsx(
                    "mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 h-fit",
                    `grid-rows-${Math.floor(users.length / 4)}`
                  )}
                >
                  {users.map((user) => (
                    <div
                      key={user._id}
                      className="border-2 rounded-lg p-3  bg-white shadow-md"
                    >
                      <div className="flex justify-between items-center">
                        <p
                          className={clsx(
                            "text-[12px] font-semibold",
                            user.status === "ACTIVE"
                              ? "text-[#3DDF05]"
                              : "text-[#FD0000]"
                          )}
                        >
                          &bull; {user.status}
                        </p>
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M8 3.25C8.41421 3.25 8.75 2.91421 8.75 2.5C8.75 2.08579 8.41421 1.75 8 1.75C7.58579 1.75 7.25 2.08579 7.25 2.5C7.25 2.91421 7.58579 3.25 8 3.25Z"
                              stroke="#777777"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M8 8.75C8.41421 8.75 8.75 8.41421 8.75 8C8.75 7.58579 8.41421 7.25 8 7.25C7.58579 7.25 7.25 7.58579 7.25 8C7.25 8.41421 7.58579 8.75 8 8.75Z"
                              stroke="#777777"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M8 14.25C8.41421 14.25 8.75 13.9142 8.75 13.5C8.75 13.0858 8.41421 12.75 8 12.75C7.58579 12.75 7.25 13.0858 7.25 13.5C7.25 13.9142 7.58579 14.25 8 14.25Z"
                              stroke="#777777"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="flex flex-col gap-2 items-center justify-center my-2">
                        {/* <img src={user.image} alt={user.name} className='border-2 rounded-full' /> */}
                        <div className="h-40 w-40 rounded-full">
                          <img
                            src="/svg/account.svg"
                            alt={user.fullName}
                            className="w-full"
                          />
                        </div>
                        <p className="text-lg font-semibold mb-1">
                          {user.fullName}
                        </p>
                      </div>
                      <div className="flex gap-2 text-xs justify-center">
                        <div className="flex flex-col gap-2 items-center">
                          <p className="font-bold">Ongoing work</p>
                          <p className="text-sm">
                            {
                              user.projects.filter(
                                (project) =>
                                  project.stage === "DESIGN" ||
                                  project.stage === "CONSTRUCTION"
                              ).length
                            }
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                          <p className="font-bold">Completed work</p>
                          <p className="text-sm">
                            {
                              user.projects.filter(
                                (project) => project.stage === "COMPLETE"
                              ).length
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center my-3">
                        <Link
                          to={`/users/${user._id}`}
                          className="bg-[#0000DA] px-5 py-2 rounded-full text-white text-sm"
                        >
                          View Projects
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
