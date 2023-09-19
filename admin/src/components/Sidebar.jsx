import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api } from '../config/axios'

const Sidebar = () => {
        const location = useLocation()
        const navigate = useNavigate()
        const logout = async () => {
                await localStorage.removeItem("uid")
                navigate("/login")
        }
        const [user, setUser] = useState()
        useEffect(() => {
                const fetchCurrentUser = async () => {
                        const id = await localStorage.getItem("uid")
                        api.get(`/users/${id}`).then((res) => {
                                setUser(res.data.data.user)
                        }).catch((err) => {
                                console.log(err)
                        })
                }
                fetchCurrentUser()
        })
        return (
                <div className='bg-white md:w-[300px] transition-all duration-500 lg:w-[25%] border-r-[#005DFF1F] border-r-2  h-screen overflow-hidden p-4 px-3'>
                        <div className="flex flex-col justify-between h-[95vh] ">
                                <div className="flex flex-col gap-2">
                                        <div className="flex gap-2 items-center">
                                                <img src="/images/logo.png" alt="" className='w-[50%] '/>
                                        </div>
                                        <div className="w-full h-1 rounded-2xl bg-gray-700"></div>
                                        <div className="flex flex-col gap-2 my-2">
                                                <Link to={"/"} className={clsx("flex items-center gap-2 hover:bg-[rgba(0,0,218,.2)]  px-4 rounded-md transition-all duration-150 py-2 ", location.pathname === "/" && "bg-[rgba(0,0,218,.2)]")}>
                                                        <img className="w-[20px] h-[20px]" src="/svg/dashboard.svg" alt="" />
                                                        <p className='font-medium hidden lg:block'>Analytics</p>
                                                </Link>
                                                <Link to={"/notifications"} className={clsx("flex items-center gap-2 hover:bg-[rgba(0,0,218,.2)]  px-4 rounded-md transition-all duration-150 py-2 ", location.pathname === "/notifications" && "bg-[rgba(0,0,218,.2)]")}>
                                                        <img className="w-[20px] h-[20px]" src="/svg/notifications.svg" alt="" />
                                                        <p className='font-medium hidden lg:block'>Notifications</p>
                                                </Link>
                                                <Link to={"/plans"} className={clsx("flex items-center gap-2 hover:bg-[rgba(0,0,218,.2)]  px-4 rounded-md transition-all duration-150 py-2 ", location.pathname === "/plans" && "bg-[rgba(0,0,218,.2)]")}>
                                                        <img className="w-[20px] h-[20px]" src="/svg/plans.svg" alt="" />
                                                        <p className='font-medium hidden lg:block'>Plans</p>
                                                </Link>
                                                {user?.role === "ADMIN" && <Link to={"/users"} className={clsx("flex items-center gap-2 hover:bg-[rgba(0,0,218,.2)]  px-4 rounded-md transition-all duration-150 py-2 ", location.pathname === "/users" && "bg-[rgba(0,0,218,.2)]")}>
                                                        <img className="w-[20px] h-[20px]" src="/svg/users.svg" alt="" />
                                                        <p className='font-medium hidden lg:block'>User Profiles</p>
                                                </Link>}
                                                {user?.role === "ADMIN" && <Link to={"/gallery"} className={clsx("flex items-center gap-2 hover:bg-[rgba(0,0,218,.2)]  px-4 rounded-md transition-all duration-150 py-2 ", location.pathname === "/gallery" && "bg-[rgba(0,0,218,.2)]")}>
                                                        <img className="w-[20px] h-[20px]" src="/svg/gallery.svg" alt="" />
                                                        <p className='font-medium hidden lg:block'>Gallery</p>
                                                </Link>}
                                        </div>
                                </div>
                                <button onClick={logout} className="flex items-center gap-2 hover:bg-[rgba(0,0,218,.2)]  px-4 py-2 ">
                                        <img className="w-[20px] h-[20px]" src="/svg/logout.svg" alt="" />
                                        <p className='hidden lg:block font-medium '>Logout</p>
                                </button>
                        </div>
                </div>
        )
}

export default Sidebar