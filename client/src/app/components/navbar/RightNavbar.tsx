"use client";

import { User } from "@/app/interfaces/types";
import { getAllPost } from "@/app/store/reducers/postsSlice";
import { getAllUser, UserState } from "@/app/store/reducers/userSlice";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RightNavbar: React.FC = () => {
  const router = useRouter();
  const users = useSelector((state: { users: UserState }) => state.users.users);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
 const dispatch= useDispatch();
  const goToUserProfile = (id: string | undefined) => {
    router.push(`/profile/${id}?isSelf=0`);
  };
  useEffect(()=>{
    dispatch(getAllUser())
  },[])
  const getRandomUsers = (users: User[], count: number) => {
  const shuffled = [...users].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}; 
useEffect(() => {
  const userId = localStorage.getItem("currentUserId");
  if (userId) {
    const findId = JSON.parse(userId);
    const findedUser = users.find((user) => user?.id == findId);
    setCurrentUser(findedUser);
  }
}, [users]);

const randomUsers = useMemo(() => {
  if (users.length > 0) {
    const filteredUsers = currentUser
      ? users.filter(user => user.id !== currentUser.id)
      : users;
    return getRandomUsers(filteredUsers, 5);
  }
  return [];
}, [users, currentUser]);

  return (
    <div className="flex flex-col space-y-4 flex-nowrap top-0 max-w-sm pr-10">
      {/* A: Current User Data */}
      <div
        className="rounded-lg flex items-center space-x-2 cursor-pointer"
        onClick={() => goToUserProfile(`${currentUser?.id}`)}
      >
        <div className="flex-initial">
          <img
            src={currentUser?.avatar} // Use the actual URL for the profile picture
            alt={`${currentUser?.name}'s profile picture`} // Dynamic alt text
            width={44}
            height={44}
            className="w-11 h-11 rounded-full"
          />
        </div>

        <div className="flex-initial">
          <span className="font-sans text-sm font-semibold text-white">
            {currentUser?.name} 
          </span>
        </div>

        <div className="flex-initial grow grid">
          <span className="font-sans text-xs text-sky-500 justify-self-end">
            Switch
          </span>
        </div>
      </div>

      <div className="rounded-lg flex items-center space-x-2">
        <div className="flex-inital">
          <span className="font-sans text-sm font-semibold text-gray-400">
            Suggestions for you
          </span>
        </div>
        <div className="flex-inital grow grid">
          <span className="font-sans text-xs text-white justify-self-end">
            See All
          </span>
        </div>
      </div>

      {randomUsers.map((suggest, index) => (
        <div
          key={index}
          className="flex flex-col"
          onClick={() => goToUserProfile(suggest.id)}
        >
          {/* Suggested Card */}
          <div className="rounded-lg flex items-center space-x-2 w-80 h-12 cursor-pointer">
            <div className="flex-inital">
              <img
                src={suggest.avatar}
                alt={`${suggest.name}'s profile picture`}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
            </div>

            <div className="flex flex-inital flex-col">
              <span className="font-sans text-sm font-semibold text-white self-start">
                {suggest.name}
              </span>
     
            </div>

            <div className="flex-inital grow grid">
              <span className="font-sans text-xs text-sky-500 justify-self-end">
                Follow
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="flex list-disc space-x-4 font-sans text-xs font-semibold text-gray-500 self-start flex-wrap">
        <li className="list-none">About</li>
        <li>Help</li>
        <li>Press</li>
        <li>API</li>
        <li>Jobs</li>
        <li>Privacy</li>
        <li>Terms</li>
        <li>Locations</li>
        <li>Language</li>
      </div>
    </div>
  );
};

export default RightNavbar;
