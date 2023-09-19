import React from "react";

const Error = ({ name }) => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="max-w-md p-4 bg-white rounded-lg ">
        <div className="text-center">
          <img
            src="/images/er.png"
            alt="Error Illustration"
            className="w-40 mx-auto mb-4"
          />
          <p className="text-2xl text-gray-700">Oops! No { name}  found.</p>
          <p className="text-gray-500">
            It seems there are no {name} available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;
