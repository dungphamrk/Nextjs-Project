"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faCompass,
  faVideo,
  faEnvelope,
  faBell,
  faPlusCircle,
  faGear,
  faClockRotateLeft,
  faBookmark,
  faMoon,
  faExclamationTriangle,
  faUserCircle,
  faSignOut,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import PhotoModal from "../modal/PhotoModal";
import { User } from "../../interfaces/types";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, UserState } from "../../store/reducers/userSlice";
import { getAllPost } from "../../store/reducers/postsSlice";
import { json } from "stream/consumers";

const SideNavbar = () => {
  const router = useRouter();
  const [activeNavBar, setActiveNavBar] = useState<string | undefined>(
    undefined
  );
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(true);
  const [isNavBarCollapsed, setIsNavBarCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const dispatch = useDispatch();
  const users = useSelector((state: { users: UserState }) => state.users.users);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(true);
  };

  //dispatch
  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  // Lấy dữ liệu về currentUser

  useEffect(() => {
    // Lấy dữ liệu từ local storage
    const userId = localStorage.getItem("currentUserId");

    // Parse dữ liệu từ chuỗi JSON sang đối tượng JavaScript (nếu có)
    if (userId) {
      const findId = JSON.parse(userId);
      const findedUser = users.find((user) => user?.id == findId);
      setCurrentUser(findedUser);
    }
  }, [users]);

  // Sample user data (replace with actual user data)
  const userProfileImg = `${currentUser?.avatar}`;

  const collapsedHiddenRoutes = ["/direct"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const routeName = window.location.pathname;
      setActiveNavBar(routeName);
      setIsNavBarCollapsed(collapsedHiddenRoutes.includes(routeName));
    }
  }, [router]);

  const toggleMoreModal = () => {
    setIsMoreModalOpen(!isMoreModalOpen);
  };

  const menuItems = [
    { title: "Home", path: "/home", name: "home", icon: faHome },
    { title: "Search", path: "/search", name: "search", icon: faSearch },
    { title: "Explore", path: "/explore", name: "explore", icon: faCompass },
    { title: "Reels", path: "/reels", name: "reels", icon: faVideo },
    { title: "Messages", path: "/direct", name: "direct", icon: faEnvelope },
    {
      title: "Notifications",
      path: "/notifications",
      name: "notifications",
      icon: faBell,
    },
    {
      title: "Create",
      path: "/create",
      name: "create",
      icon: faPlusCircle,
      onClick: () => triggerPhotoModal(),
    },
    {
      title: "Profile",
      path: `/profile/${currentUser?.id}`,
      name: "profile",
      img: userProfileImg,
    },
  ];

  const settings = [
    { name: "Settings", icon: faGear, action: () => router.push("/settings") },
    {
      name: "Your activity",
      icon: faClockRotateLeft,
      action: () => router.push("/activity"),
    },
    { name: "Saved", icon: faBookmark, action: () => {} },
    { name: "Switch Appearance", icon: faMoon, action: () => {} },
    { name: "Report a problem", icon: faExclamationTriangle, action: () => {} },
    { name: "Switch accounts", icon: faUserCircle, action: () => {} },
    { name: "Log Out", icon: faSignOut, action: () => logout() },
  ];

  const triggerPhotoModal = () => {
    // Photo modal logic here
  };

  const logout = () => {
    console.log("Logout successful");
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div
      className={`${
        isMoreModalOpen ? "" : "lights-off"
      }  flex flex-col h-screen space-y-4 flex-nowrap sticky top-0 justify-between `}
    >
      {/* Icon and Navbar */}
      <div className="flex flex-col">
        <div
          className={`p-4 rounded-lg flex cursor-pointer justify-center ${
            !isNavBarCollapsed ? "xl:justify-start" : ""
          }`}
        >
          {/* Large Icon */}
          {!isNavBarCollapsed && (
            <div className="xl:block hidden p-2 pt-7">
              <Image
                src="/assets/images/icon-dark.png"
                alt="Icon"
                width={128}
                height={28}
              />
            </div>
          )}
          {/* Small Icon */}
          <div className={isNavBarCollapsed ? "block pt-5" : "xl:hidden block"}>
            <FontAwesomeIcon icon={faHome} size="2x" />
          </div>
        </div>

        {/* Side NavBar Items */}
        <div className="p-1 md:pl-3 flex flex-col space-y-2">
          {menuItems.map((item, index) => (
            <div key={index} onClick={() => setActiveNavBar(item.name)}>
              <a
                href={item.path}
                className={`group cursor-pointer rounded-full flex space-x-4 p-3 ${
                  isNavBarCollapsed ? "xl:justify-center" : "xl:justify-start"
                } ${
                  item.name === activeNavBar
                    ? "bg-slate-1000 animate-pulse"
                    : ""
                }`}
              >
                {item.icon ? (
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="group-hover:scale-110 group-active:scale-90 delay-100"
                  />
                ) : (
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-6 h-6 rounded-full shadow-lg group-hover:scale-110"
                  />
                )}
                {!isNavBarCollapsed && (
                  <span className="xl:block hidden font-sans text-md font-normal text-white">
                    {item.title}
                  </span>
                )}
              </a>
            </div>
          ))}
        </div>
      </div>
      <PhotoModal onClose={openModal} isOpen={isOpenModal} />
      {/* More Settings */}
      <div
        onClick={toggleMoreModal}
        className="cursor-pointer rounded-full flex space-x-4 p-5 sm:hover:bg-slate-1000 sm:hover:delay-100"
      >
        <FontAwesomeIcon icon={faEllipsisH} />
        <span
          className={`${
            isNavBarCollapsed ? "xl:hidden" : "block"
          } font-sans text-md font-semibold text-white`}
        >
          More
        </span>
      </div>

      {/* More Modal */}
      {!isMoreModalOpen && (
        <div className="bg-black rounded-lg absolute max-w-xs top-2/4 left-1/2 transform translate-y-1/4 -translate-x-1/2">
          <div className="flex flex-col m-1 max-h-full overflow-y-scroll">
            {settings.map((setting, index) => (
              <div
                key={index}
                onClick={setting.action}
                className="flex w-full py-2 px-3 space-x-3 sm:hover:bg-[#343434] cursor-pointer rounded-full"
              >
                <FontAwesomeIcon icon={setting.icon} />
                <span className="font-sans text-sm font-thin text-white">
                  {setting.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideNavbar;




