import React from "react";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Chat from "./Chat";
import { checkLoggedIn } from "../services/auth.service";

const Main = () => {
  const [chatActive, setChatActive] = useState(false);
  const closeActive = () => {
    setChatActive(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const check = async () => {
      const loggedIn = await checkLoggedIn();
      if (!loggedIn) {
        navigate("/login");
      }
    };
    check();
  });
  return (
    <div className="w-full h-full overflow-hidden flex ">
      <Sidebar />
      
      <div
        className="w-full lg:w-[80%]"
        onClick={() => chatActive && setChatActive(false)}
      >
        <Outlet />
      </div>
      {chatActive && <Chat close={closeActive} />}
      <button
        onClick={() => setChatActive(true)}
        className="absolute bottom-3 right-3 p-3 bg-[#0000DA] rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M14 15V17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H6L3 21V11C3 10.7348 3.10536 10.4804 3.29289 10.2929C3.48043 10.1054 3.73478 10 4 10H6M21 14L18 11H11C10.7348 11 10.4804 10.8946 10.2929 10.7071C10.1054 10.5196 10 10.2652 10 10V4C10 3.73478 10.1054 3.48043 10.2929 3.29289C10.4804 3.10536 10.7348 3 11 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4V14Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Main;
