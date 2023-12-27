import React from "react";
import MobileSiderbar from "./mobile-sidebar";
const Navbar = () => {
  return (
    <div className="flex items-center p-4 bg-teal-500">
      <MobileSiderbar />
    </div>
  );
};

export default Navbar;
