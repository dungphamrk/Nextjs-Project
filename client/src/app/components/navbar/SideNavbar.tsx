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
import { User } from "../../interfaces/types";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, UserState } from "../../store/reducers/userSlice";
import ModalCreatePost from "../modal/CreatePostModal";
import {PostEditModal} from "../modal/PostEditModal"; // Import thêm PostEditModal

const SideNavbar = () => {
  const router = useRouter();
  const [activeNavBar, setActiveNavBar] = useState<string | undefined>(undefined);
  const [isNavBarCollapsed, setIsNavBarCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const dispatch = useDispatch();
  const users = useSelector((state: { users: UserState }) => state.users.users);

  // Modal state cho create và edit modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // Ảnh đã chọn

  // Hàm mở modal tạo bài viết
  const openCreatePostModal = () => {
    setIsCreateModalOpen(true);
  };

  // Hàm đóng cả hai modal
  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
  };

  // Hàm xử lý khi ảnh đã được chọn từ ModalCreatePost
  const handleImageSelection = (images: string[]) => {
    setSelectedImages(images); // Lưu ảnh đã chọn
    setIsCreateModalOpen(false); // Đóng ModalCreatePost
    setIsEditModalOpen(true); // Mở PostEditModal
  };

  // Dispatch users
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  useEffect(() => {
    const userId = localStorage.getItem("currentUserId");
    if (userId) {
      const findId = JSON.parse(userId);
      const findedUser = users.find((user) => user?.id == findId);
      setCurrentUser(findedUser);
    }
  }, [users]);

  const userProfileImg = `${currentUser?.avatar}`;

  const collapsedHiddenRoutes = ["/direct"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const routeName = window.location.pathname;
      setActiveNavBar(routeName);
      setIsNavBarCollapsed(collapsedHiddenRoutes.includes(routeName));
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserId');
      router.push("/login");
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
      path: "#", // Giữ nguyên "#" để ngăn redirect
      name: "create",
      icon: faPlusCircle,
      onClick: openCreatePostModal, // Gọi hàm mở modal
    },
    {
      title: "Profile",
      path: `/profile/${currentUser?.id}`,
      name: "profile",
      img: userProfileImg,
    },
    { title: "Log Out", icon: faSignOut,
      onClick:  logout },
  ];



  return (
    <> 
      {/* Gọi modal tạo bài viết và modal chỉnh sửa bài viết */}
      {isCreateModalOpen && (
        <ModalCreatePost
          
          onClose={closeModals}
          onImageSelect={handleImageSelection} // Xử lý khi ảnh được chọn
        />
      )}
      {isEditModalOpen && (
        <PostEditModal
          onClose={closeModals}
          activePost={undefined}
          selectedImages={selectedImages} // Truyền ảnh đã chọn
        />
      )}

      <div className={`flex flex-col h-screen space-y-4 flex-nowrap sticky top-0 justify-between`}>
        <div className="flex flex-col">
          {/* Icon và Navbar */}
          <div className={`p-4 rounded-lg flex cursor-pointer justify-center ${!isNavBarCollapsed ? "xl:justify-start" : ""}`}>
            {!isNavBarCollapsed && (
              <div className="xl:block hidden p-2 pt-7">
                <img src="https://th.bing.com/th/id/R.26d9974a1feec9905a4e0d5e5ddf8db6?rik=Og1ujXM2C1AJHQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fa%2fa5%2fInstagram_icon.png&ehk=1%2fZWXYn2nN%2fR80TOtcKH5SsdLkkUvMLrB%2fHUXRDHk9I%3d&risl=&pid=ImgRaw&r=0" alt="Icon" width={30} height={28} />
              </div>
            )}
            <div className={isNavBarCollapsed ? "block pt-5" : "xl:hidden block"}>
              <FontAwesomeIcon icon={faHome} size="2x" />
            </div>
          </div>

          {/* Các mục Side Navbar */}
          <div className="p-1 md:pl-3 flex flex-col space-y-2">
            {menuItems.map((item, index) => (
              <div key={index} onClick={item.onClick ? item.onClick : () => setActiveNavBar(item.name)}>
                <a href={item.path} className={`group cursor-pointer rounded-full flex space-x-4 p-3 ${isNavBarCollapsed ? "xl:justify-center" : "xl:justify-start"} ${item.name === activeNavBar ? "bg-slate-1000 animate-pulse" : ""}`}>
                  {item.icon ? (
                    <FontAwesomeIcon icon={item.icon} className="group-hover:scale-110 group-active:scale-90 delay-100" />
                  ) : (
                    <img src={item.img} alt={item.title} className="w-6 h-6 rounded-full shadow-lg group-hover:scale-110" />
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
      </div>
    </>
  );
};

export default SideNavbar;
