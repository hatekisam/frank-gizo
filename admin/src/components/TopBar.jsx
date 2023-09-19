import React from 'react'

function TopBar({title, children}) {
  return (
    <div className="fixed top-0 w-[75vw] bg-white  h-[10vh] z-50 border-b-2 flex flex-row items-center">
      <p className="text-[#2D2D2D]  md:text-md text-xl font-medium">{title}</p>
      <div>{children}</div>
    </div>
  );
}

export default TopBar