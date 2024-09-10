import {
  faBookmark,
  faFileLines,
  faTableCells,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="lg:max-w-4xl h-screen sm:h-auto w-full mx-auto sm:mt-10 text-center">
        <div className="flex flex-col w-full max-w-4xl flex-nowrap space-y-4 pt-2 md:pt-0 justify-self-end lg:mr-[64px]">
          <div className="flex md:space-x-14 md:pl-14 md:pb-8 space-x-7">
            {/* User Profile image */}
            <div>
              <img
                src="https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
                className="md:w-36 md:h-36 h-20 w-20 rounded-full ml-9"
                alt="User Profile"
              />
            </div>
            {/* User profile stats */}
            <div className="md:pl-20 bg-black flex flex-col space-y-6">
              <div className="md:flex md:flex-row flex-col md:space-x-4 space-y-3 items-center">
                {/* User name */}
                <div className="md:pl-0 font-sans text-lg font-normal text-white text-left md:mt-4">
                  BrainFuckUser
                </div>
                <div className="flex flex-row space-x-6">
                  {/* Personal logged-in user Options */}
                  <div className="md:pl-0">
                    <button className="font-medium text-center text-white focus:outline focus:outline-2 transition-all border ease-in duration-150 disabled:cursor-not-allowed disabled:border-0 w-full relative py-2 px-3 text-xs rounded-lg bg-[#363636] text-white hover:text-white hover:bg-gray-800 border-none disabled:bg-gray-500 disabled:text-white focus:outline-none">
                      <span className="lg:text-md text-sm font-semibold">
                        {" "}
                        Edit Profile{" "}
                      </span>
                    </button>
                  </div>
                  <div className="md:pl-0">
                    <button className="font-medium text-center text-white focus:outline focus:outline-2 transition-all border ease-in duration-150 disabled:cursor-not-allowed disabled:border-0 w-full relative py-2 px-3 text-xs rounded-lg bg-[#363636] text-white hover:text-white hover:bg-gray-800 border-none disabled:bg-gray-500 disabled:text-white focus:outline-none">
                      <span className="sm:text-md text-sm font-semibold">
                        {" "}
                        View Archive{" "}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Stats Rendering */}
              <div className="md:block hidden">
                <div className="flex space-x-10">
                  <div className="font-sans text-md font-normal text-white sm:hover:cursor-pointer">
                    <span className="font-sans text-sm font-bold text-white">
                      40
                    </span>{" "}
                    posts
                  </div>
                  <div className="font-sans text-md font-normal text-white sm:hover:cursor-pointer">
                    <span className="font-sans text-sm font-bold text-white">
                      791
                    </span>{" "}
                    followers
                  </div>
                  <div className="font-sans text-md font-normal text-white sm:hover:cursor-pointer">
                    <span className="font-sans text-sm font-bold text-white">
                      637
                    </span>{" "}
                    following
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* thanh điều hướng*/}
          <div className="text-center border-t border-slate-1100">
            <ul className="flex sm:space-x-14 flex-wrap -mb-px md:justify-center justify-between sm:px-6">
              {/* Posts Tab */}
              <li className="sm:hover:cursor-pointer">
                <div className="flex items-center space-x-2 inline-block py-4 p-1 border-t-2 border-gray-300 sm:hover:border-gray-300 text-white">
                  <span className="md:block hidden">
                    <FontAwesomeIcon icon={faTableCells} size="sm" />
                  </span>
                  <span className="md:hidden block">
                    <FontAwesomeIcon icon={faTableCells} size="lg" />
                  </span>
                  <span className="text-xs subpixel-antialiased hidden md:block">
                    POSTS
                  </span>
                </div>
              </li>

              {/* Feed Tab */}
              <li className="sm:hover:cursor-pointer md:hidden block">
                <div className="flex items-center space-x-2 inline-block py-4 p-1 border-t-2 border-gray-300 sm:hover:border-gray-300 border-transparent text-gray-200">
                  <span className="md:hidden block">
                    <FontAwesomeIcon icon={faFileLines} size="lg" />
                  </span>
                  <span className="text-xs subpixel-antialiased hidden md:block">
                    FEED
                  </span>
                </div>
              </li>

              {/* Saved Tab */}
              <li className="sm:hover:cursor-pointer">
                <div className="flex items-center space-x-2 inline-block py-4 p-1 border-t-2 border-gray-300 sm:hover:border-gray-300 border-transparent text-gray-300 sm:hover:text-gray-300">
                  <span className="md:block hidden">
                    <FontAwesomeIcon icon={faBookmark} size="sm" />
                  </span>
                  <span className="md:hidden block">
                    <FontAwesomeIcon icon={faBookmark} size="lg" />
                  </span>
                  <span className="text-xs subpixel-antialiased hidden md:block">
                    SAVED
                  </span>
                </div>
              </li>

              {/* Tagged Tab */}
              <li className="sm:hover:cursor-pointer">
                <div className="flex items-center space-x-2 inline-block py-4 p-1 border-t-2 border-gray-300 sm:hover:border-gray-300 border-transparent text-gray-300 sm:hover:text-gray-300">
                  <span className="md:block hidden">
                    <FontAwesomeIcon icon={faTag} size="sm" />
                  </span>
                  <span className="md:hidden block">
                    <FontAwesomeIcon icon={faTag} size="lg" />
                  </span>
                  <span className="text-xs subpixel-antialiased hidden md:block">
                    TAGGED
                  </span>
                </div>
              </li>
            </ul>
          </div>
          {/* Post section */}
          <div className="flex flex-wrap">
            <div className="h-fit w-fit basis-1/3 p-0.5 relative hover:brightness-75 group hover:cursor-pointer">
              <div className="flex absolute space-x-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:group-hover:visible invisible">
                <div className="flex font-bold text-white text-md space-x-1">
                  <i className="fa-solid fa-heart mt-1"></i>
                  <span>547</span>
                </div>
                <div className="flex font-bold text-white text-md space-x-1">
                  <i className="fa-solid fa-comment mt-1"></i>
                  <span>699</span>
                </div>
              </div>
              <img
                src="https://picsum.photos/seed/QN5feaiH2h/1024/1280"
                alt="Post 1"
              />
            </div>

            <div className="h-fit w-fit basis-1/3 p-0.5 relative hover:brightness-75 group hover:cursor-pointer">
              <div className="flex absolute space-x-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:group-hover:visible invisible">
                <div className="flex font-bold text-white text-md space-x-1">
                  <i className="fa-solid fa-heart mt-1"></i>
                  <span>914</span>
                </div>
                <div className="flex font-bold text-white text-md space-x-1">
                  <i className="fa-solid fa-comment mt-1"></i>
                  <span>36</span>
                </div>
              </div>
              <img
                src="https://picsum.photos/seed/BVU1xbSK/1024/1280"
                alt="Post 2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
