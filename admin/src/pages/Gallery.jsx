import React from "react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { fetchAllFolders } from "../services/gallery.service";
import { FadeLoader } from "react-spinners";
import Error from "../components/Error";

const Gallery = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await fetchAllFolders();
        if (Array.isArray(result)) {
          setFolders(result);
        }
        setLoading(false);
      } catch (error) {
        toast.error("Error Getting Folders");
      }
    };
    fetchProjects();
  }, []);
  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden p-5">
      <Helmet>
        <title>SHDR | Gallery</title>
      </Helmet>
      <div className="my-2">
        <div className="p-3 border-b-2 flex items-center justify-between">
          <p className="text-[#2D2D2D]  font-bold ">Gallery</p>
          <Link to={"/gallery/create"} className="flex gap-2 items-center">
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
            <p className="text-[#555555] font-semibold">Create Folder</p>
          </Link>
        </div>
      </div>
      {loading ? (
        <div className="w-full h-[300px] flex items-center justify-center">
          <FadeLoader color="gray" />
        </div>
      ) : (
        <div>
          {folders.length === 0 ? (
            <Error name="folders" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-5 transition-all duration-500">
              {folders.map((folder, index) => {
                return (
                  <Link
                    to={`/gallery/folders/${folder._id}`}
                    key={index}
                    className="flex gap-2 items-center hover:bg-[#F8F8F8] rounded-lg p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="43"
                      height="43"
                      viewBox="0 0 43 43"
                      fill="none"
                    >
                      <path
                        d="M31.5335 17.9168H22.7743M38.5409 21.1382C38.5409 16.4226 38.5409 14.063 37.192 12.5311C37.0683 12.3897 36.9373 12.2551 36.7996 12.128C35.3018 10.7502 32.9946 10.7502 28.3837 10.7502H27.7285C25.7086 10.7502 24.6978 10.7502 23.7553 10.476C23.2381 10.3248 22.7396 10.1132 22.2697 9.84537C21.4148 9.35983 20.7001 8.62704 19.2706 7.16683L18.3071 6.18141C17.827 5.6905 17.5888 5.44683 17.3365 5.23183C16.2515 4.31206 14.9206 3.74823 13.5175 3.61395C13.1916 3.5835 12.8518 3.5835 12.1756 3.5835C10.6287 3.5835 9.85612 3.5835 9.21144 3.70891C7.8272 3.97627 6.55388 4.66412 5.55761 5.68271C4.56135 6.70129 3.88839 8.00333 3.62654 9.41895C3.50391 10.0801 3.50391 10.872 3.50391 12.4522M38.5252 28.6668C38.4621 33.1102 38.1398 35.6275 36.4878 37.317C34.4363 39.4168 31.1324 39.4168 24.5261 39.4168H17.5187C10.9125 39.4168 7.60849 39.4168 5.55708 37.317C3.50391 35.219 3.50391 31.8399 3.50391 25.0835V19.7085"
                        stroke="#777777"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                    <p>{folder.name}</p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;
