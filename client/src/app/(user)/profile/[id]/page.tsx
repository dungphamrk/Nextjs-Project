"use client";
import { PostCard, User } from "@/app/interfaces/types";
import { getAllPost, PostState } from "@/app/store/reducers/postsSlice";
import { getAllUser, UserState } from "@/app/store/reducers/userSlice";
import {
  faBookmark,
  faComment,
  faHeart,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const users = useSelector((state: { users: UserState }) => state.users.users);
  const posts = useSelector((state: { posts: PostState }) => state.posts.Posts);

  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<"POSTS" | "SAVED">("POSTS");
  const [renderedUser, setRenderedUser] = useState<User | undefined>(undefined);
  const dispatch = useDispatch();
  const router = useRouter();

  const isCurrentUser = (idParams: string, idCurrentUser: string) => {
    return idParams == idCurrentUser;
  };

  // Dispatch to get all users and posts
  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllPost());
  }, [dispatch]);

  // Get current user data from local storage and find the user from the state
  useEffect(() => {
    const userId = localStorage.getItem("currentUserId");
    if (userId) {
      const findId = JSON.parse(userId);
      const findedUser = users.find((user) => user?.id === findId);
      setCurrentUser(findedUser);
    }
  }, [users]);
  useEffect(() => {
    if (currentUser) {
      isCurrentUser(id, currentUser?.id)
        ? setRenderedUser(currentUser)
        : setRenderedUser(users.find((user) => user.id == id));
    }
  }, [currentUser]);

  // Posts of current user
  const postOfUser = posts.filter((post) => post.idUser == renderedUser?.id);

  // Saved posts of current user based on savedPost array
  const savedPosts = posts.filter((post) =>
    renderedUser?.savedPost.includes(post.id)
  );

  // Render posts based on activeTab
  const displayedPosts = activeTab === "POSTS" ? postOfUser : savedPosts;

  return (
    <div className="lg:max-w-4xl h-screen sm:h-auto w-full mx-auto sm:mt-10 text-center">
      <div className="flex flex-col w-full max-w-4xl flex-nowrap space-y-4 pt-2 md:pt-0 justify-self-end lg:mr-[64px]">
        <div className="flex md:space-x-14 md:pl-14 md:pb-8 space-x-7">
          {/* User Profile image */}
          <div>
            <img
              src={
                renderedUser?.avatar ||
                "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
              }
              className="md:w-36 md:h-36 h-20 w-20 rounded-full ml-9"
              alt="User Profile"
            />
          </div>
          {/* User profile stats */}
          <div className="md:pl-20 bg-black flex flex-col space-y-6">
            <div className="md:flex md:flex-row flex-col md:space-x-4 space-y-3 items-center">
              {/* User name */}
              <div className="md:pl-0 font-sans text-lg font-normal text-white text-left md:mt-4">
                {renderedUser?.userName || "BrainFuckUser"}
              </div>
              <div className="flex flex-row space-x-6">
                {/* Personal logged-in user Options */}
                {currentUser && isCurrentUser(id, currentUser?.id) ? (
                  <div className="md:pl-0">
                    <button className="font-medium text-center text-white focus:outline focus:outline-2 transition-all border ease-in duration-150 disabled:cursor-not-allowed disabled:border-0 w-full relative py-2 px-3 text-xs rounded-lg bg-[#363636] text-white hover:text-white hover:bg-gray-800 border-none disabled:bg-gray-500 disabled:text-white focus:outline-none">
                      <span
                        onClick={() =>
                          router.push(`/userInfor/${currentUser?.id}`)
                        }
                        className="lg:text-md text-sm font-semibold"
                      >
                        Chỉnh sửa trang cá nhân
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="md:pl-0">
                    <button className="font-medium text-center text-white focus:outline focus:outline-2 transition-all border ease-in duration-150 disabled:cursor-not-allowed disabled:border-0 w-full relative py-2 px-3 text-xs rounded-lg bg-[#1a73e8] text-white hover:text-white hover:bg-blue-600 border-none disabled:bg-gray-500 disabled:text-white focus:outline-none">
                      <span className="lg:text-md text-sm font-semibold ">
                        Theo dõi
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Stats Rendering */}
            <div className="md:block hidden">
              <div className="flex space-x-10">
                <div className="font-sans text-md font-normal text-white sm:hover:cursor-pointer">
                  <span className="font-sans text-sm font-bold text-white">
                    {renderedUser?.follows.length || 0}
                  </span>{" "}
                  followers
                </div>
                <div className="font-sans text-md font-normal text-white sm:hover:cursor-pointer">
                  <span className="font-sans text-sm font-bold text-white">
                    {renderedUser?.friends.length || 0}
                  </span>{" "}
                  following
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="text-center border-t border-[#383838] border-slate-1100">
          <ul className="flex sm:space-x-14 flex-wrap -mb-px md:justify-center justify-between sm:px-6">
            <li className="sm:hover:cursor-pointer">
              <div
                className={`flex items-center space-x-2 inline-block py-4 p-1 border-t-2 ${
                  activeTab === "POSTS"
                    ? "border-gray-300 text-white"
                    : "border-transparent text-gray-300"
                }`}
                onClick={() => setActiveTab("POSTS")}
              >
                <FontAwesomeIcon icon={faTableCells} size="sm" />
                <span className="text-xs subpixel-antialiased hidden md:block">
                  POSTS
                </span>
              </div>
            </li>
            <li className="sm:hover:cursor-pointer">
              <div
                className={`flex items-center space-x-2 inline-block py-4 p-1 border-t-2 ${
                  activeTab === "SAVED"
                    ? "border-gray-300 text-white"
                    : "border-transparent text-gray-300"
                }`}
                onClick={() => setActiveTab("SAVED")}
              >
                <FontAwesomeIcon icon={faBookmark} size="sm" />
                <span className="text-xs subpixel-antialiased hidden md:block">
                  SAVED
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Post section */}
        <div className="flex flex-wrap">
          {displayedPosts?.map((post, index) => (
            <div
              key={index}
              className="w-fit basis-1/3 p-0.5 relative hover:brightness-75 group hover:cursor-pointer"
            >
              <div className="flex absolute space-x-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:group-hover:visible invisible">
                <div className="flex font-bold text-white text-md space-x-1">
                  <FontAwesomeIcon icon={faHeart} />
                  <span>{post.likeCount || 0}</span>
                </div>
                <div className="flex font-bold text-white text-md space-x-1">
                  <FontAwesomeIcon icon={faComment} />
                  <span>{post.comments?.length || 0}</span>
                </div>
              </div>
              <img
                className="object-cover h-full min-h-[380px]"
                src={
                  (post.carouselMedia && post.carouselMedia[0]?.mediaUrl) ||
                  "https://picsum.photos/seed/default/1024/1280"
                }
                alt={`post ${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
