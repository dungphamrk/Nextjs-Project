"use client";
import { CommentModal } from "@/app/components/modal/CommentModal";
import RightNavbar from "@/app/components/navbar/RightNavbar";
import Post from "@/app/components/Post";
import { ModalSize, PostCard, User } from "@/app/interfaces/types";
import { getAllPost, PostState } from "@/app/store/reducers/postsSlice";
import { updateUser, UserState } from "@/app/store/reducers/userSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const posts = useSelector((state: { posts: PostState }) => state.posts.Posts);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const users = useSelector((state: { users: UserState }) => state.users.users);
  const[activePost,setActivePost]=useState<PostCard>(posts[0]);
  const dispatch = useDispatch();
  const router= useRouter();

  useEffect(() => {
    dispatch(getAllPost());
  }, []);
  useEffect(() => {
    const userId = localStorage.getItem("currentUserId");
    if (userId) {
      const findId = JSON.parse(userId);
      const findedUser = users.find((user) => user?.id === findId);
      setCurrentUser(findedUser);
    }else {
      Swal.fire("Vui lòng đăng nhập trước");
      router.push("login")
    }
  }, [users]);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handlePostLike = (currentUser: User) => {
    dispatch(updateUser(currentUser));
    console.log(currentUser);
    
  };
  const handleBookmark = (currentUser: User) => {
    dispatch(updateUser(currentUser));
  };
  const handleOpenCommentModal = (post: PostCard) => {
    setActivePost(post);
    setIsModalOpen(true)
  };
  const handlePostComment = (comment: string, postId: string) => {
    console.log(`Comment "${comment}" added to post ${postId}`);
  };



  

  return (
    <>
      <div className="w-full flex justify-evenly sm:mt-10 ">
        <div className="flex flex-col w-full md:w-[600px] gap-9 space-y-4 overflow-y-scroll no-scrollbar px-4">
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              users={users}
              currentUser={currentUser}
              onOpenCommentModal={handleOpenCommentModal}
              onPostLike={handlePostLike}
              onPostComment={handlePostComment}
              onPostBookmark={handleBookmark}
            />
          ))} 
        </div>
      
        <RightNavbar />
         <CommentModal onClose={closeModal} activePost={activePost}  isToggled={isModalOpen} />
      </div>
    </>
  );
}
