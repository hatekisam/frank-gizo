
"react-helmet";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Messages = () => {
  const chats = [
    {
      id: 1,
      name: "General Chat",
      image: "/images/person2.png",
      description: "A chat room for general discussions.",
      createdBy: "User1",
      createdAt: "2023-09-01 10:00 AM",
      members: ["User1", "User2", "User3"],
      messages: [
        {
          id: 101,
          sender: "User1",
          text: "Hello, everyone!",
          timestamp: "2023-09-01 10:05 AM",
        },
        {
          id: 102,
          sender: "User2",
          text: "Hi there!",
          timestamp: "2023-09-01 10:10 AM",
        },
        {
          id: 103,
          sender: "User3",
          text: "Good morning!",
          timestamp: "2023-09-01 10:15 AM",
        },
        {
          id: 104,
          sender: "User1",
          text: "What are you all up to today?",
          timestamp: "2023-09-01 10:20 AM",
        },
        {
          id: 105,
          sender: "User2",
          text: "Just working on some code.",
          timestamp: "2023-09-01 10:25 AM",
        },
        // Add more messages as needed
      ],
    },
    {
      id: 2,
      image: "/images/person1.png",
      name: "Programming Help",
      description: "Get help with programming questions.",
      createdBy: "User2",
      createdAt: "2023-09-02 02:30 PM",
      members: ["User2", "User4"],
      messages: [
        {
          id: 201,
          sender: "User2",
          text: "Can someone help me with JavaScript?",
          timestamp: "2023-09-02 02:35 PM",
        },
        {
          id: 202,
          sender: "User4",
          text: "Sure, what do you need help with?",
          timestamp: "2023-09-02 02:40 PM",
        },
        {
          id: 203,
          sender: "User5",
          text: "I can help with that too!",
          timestamp: "2023-09-02 02:45 PM",
        },
        {
          id: 204,
          sender: "User2",
          text: "Great, I have a question about closures.",
          timestamp: "2023-09-02 02:50 PM",
        },
        {
          id: 205,
          sender: "User4",
          text: "Closures can be tricky. What specifically do you want to know?",
          timestamp: "2023-09-02 02:55 PM",
        },
      ],
    },
  ];
  const me = "User2";

  return (
    <div className="w-full h-full overflow-hidden p-5">
      <Helmet>
        <title>SHDR | Messages</title>
      </Helmet>
      <div className="p-3 my-2">
        <div className="border-b-2">
          <p className="text-[#2D2D2D]  font-bold ">Messages</p>
        </div>
      </div>
      <div className="flex  h-[89%]">
        <div className="w-[24%] border-r-2 border-r-[#0000DA] h-full">
          <p className="text-lg font-bold">Chats</p>
          <div className="p-2">
            {chats.map((chat) => {
              return (
                <Link
                  to={`/messages/${chat.id}`}
                  key={chat.id}
                  className="my-1  text-sm"
                >
                  <div className="flex gap-2 items-center hover:bg-[#F8F8F8] px-2 py-1">
                    <img
                      src={chat.image}
                      alt={chat.description}
                      className="w-[15%]"
                    />
                    <p>
                      {chat.members.length > 2
                        ? chat.name
                        : chat.members.filter((member) => member !== me)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="w-[76%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Messages;
