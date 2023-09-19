import React from "react";

import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import { fetchAllNots } from "../services/notification.service";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import Error from "../components/Error";
// interface Notification {
//         id: number;
//         action: string;
//         doer: string;
//         time: Date;
// }
const Notifications = () => {
  const [nots, setNots] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const uid = await localStorage.getItem("uid");
        if (uid) {
          const result = await fetchAllNots(uid);
          if (Array.isArray(result)) {
            setNots(result);
          }
          setLoading(false);
        } else {
          navigate("/login");
        }
      } catch (error) {
        toast.error("Error Getting Notifications");
      }
    };
    fetchProjects();
  }, []);

  // const groupedNotifications: { [date: string]: Notification[] } = nots
  //         .filter((notification) => notification.createdAt <= new Date())
  //         .reduce((acc, notification) => {
  //                 const dateKey = notification.createdAt.toDateString();
  //                 acc[dateKey] = acc[dateKey] || [];
  //                 acc[dateKey].push(notification);
  //                 return acc;
  //         }, {});

  const groupedNotifications = nots
    .filter((notification) => notification.createdAt instanceof Date)
    .reduce((acc, notification) => {
      console.log(acc);
      const dateKey = notification.createdAt.toDateString();
      acc[dateKey] = acc[dateKey] || [];
      acc[dateKey].push(notification);
      return acc;
    }, {});

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden p-5">
      <Helmet>
        <title>SHDR | Notifications</title>
      </Helmet>
      <div className="p-3 my-2">
        <div className="border-b-2">
          <p className="text-[#2D2D2D]  font-bold ">Notifications</p>
        </div>
      </div>
      {loading ? (
        <div className="w-full h-[300px] flex items-center justify-center">
          <FadeLoader color="gray" />
        </div>
      ) : (
        <div className="p-3">
          {nots.length === 0 ? (
            <Error name="notifications" />
          ) : (
            <div>
              <div>
                {nots.map((notification) => (
                  <div
                    key={notification._id}
                    className="relative border-l-2 px-3"
                  >
                    <div className="absolute w-2 h-2 rounded-full bg-[#555555] top-2 -left-[5px]"></div>
                    <p className="font-semibold text-sm my-2">
                      <span className="text-[#005DFFB0]">
                        {notification.doer.fullName}
                      </span>{" "}
                      {notification.action}
                    </p>
                    <p className="text-xs">
                      {new Date(notification.createdAt).getHours()}:
                      {new Date(notification.createdAt).getMinutes() < 10
                        ? `0${new Date(notification.createdAt).getMinutes()}`
                        : new Date(notification.createdAt).getMinutes()}
                    </p>
                    {/* <p>{new Date(notification.createdAt).getT.toLocaleString()}</p> */}
                  </div>
                ))}
              </div>
              {Object.entries(groupedNotifications)
                .sort(
                  (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
                )
                .map(([date, notifications]) => (
                  <div key={date}>
                    <div className="relative py-2 my-4">
                      <div className="w-full h-1 bg-[#E6E6E6]"></div>
                      <div className="absolute left-0 transition-all duration-200 sm:left-[43%] -top-[50%] bg-white px-4 py-2 rounded-full border-2 text-sm">
                        {date === new Date().toDateString()
                          ? "Today"
                          : date ===
                            new Date(
                              new Date().getTime() - 24 * 60 * 60 * 1000
                            ).toDateString()
                          ? "Yesterday"
                          : date}
                      </div>
                    </div>
                    <div>
                      {notifications.map((notification) => (
                        <div
                          key={notification._id}
                          className="relative border-l-2 px-3"
                        >
                          <div className="absolute w-2 h-2 rounded-full bg-[#555555] top-2 -left-[5px]"></div>
                          <p className="font-semibold text-sm my-2">
                            <span className="text-[#005DFFB0]">
                              {notification.doer.fullName}
                            </span>{" "}
                            {notification.action}
                          </p>
                          <p className="text-xs">
                            {notification?.createdAt?.getHours()}:
                            {notification?.createdAt?.getMinutes() < 10
                              ? `0${notification?.createdAt?.getMinutes()}`
                              : notification?.createdAt?.getMinutes()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
