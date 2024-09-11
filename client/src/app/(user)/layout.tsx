import React from "react";
import SideNavbar from "../components/navbar/SideNavbar";

interface UserLayout {
  children: React.ReactNode;
}
const userLayout: React.FC<UserLayout> = ({ children }) => {
  return (
    <div className="flex no-scrollbar w-full h-screen overflow-hidden">
      <SideNavbar />
      {children}
    </div>
  );
};

export default userLayout;
