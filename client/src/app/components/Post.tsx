import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShare,
  faBookmark,
  faEllipsisV,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark as faBookmarkRegular,
  faComment as faCommentRegular,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons"; // Import biểu tượng bookmark rỗng
import MediaCarousel from "./MediaCarousel";
import { PostCard, PostMedia, User } from "@/app/interfaces/types";
import Swal from "sweetalert2";
import { convertTime } from "../interfaces/convertTime";
import UpdatePostModal from "./modal/UpdatePostModal";
import { useDispatch } from "react-redux";
import { deletePost } from "../store/reducers/postsSlice";
import { PostEditModal } from "./modal/PostEditModal";

interface PostProps {
  post: PostCard;
  currentUser:User | undefined;
  isCommentAreaVisible?: boolean;
  users:User[];
  onOpenCommentModal: (post: PostCard) => void;
  onPostLike: (user: User) => void;
  onPostBookmark: (user: User) => void; // Callback khi bookmark
}

const Post: React.FC<PostProps> = ({
  post,
  users,
  currentUser,
  isCommentAreaVisible = true,
  onOpenCommentModal,
  onPostLike,
  onPostBookmark,
}) => {
  const [comment, setComment] = useState("");
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [hasLiked, setHasLiked] = useState(() => {
    return currentUser && Array.isArray(currentUser.hasLiked)
      ? currentUser.hasLiked.includes(post.id)
      : false;
  });
  const dispatch = useDispatch();
  const [hasBookmarked, setHasBookmarked] = useState(() => {
    return currentUser && Array.isArray(currentUser.hasBookmarked)
      ? currentUser.hasBookmarked.includes(post.id)
      : false;
  });  // Trạng thái bookmark
  const [userOfPost,setUserOfPost] = useState<User|undefined>(undefined);
  const router = useRouter();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    // Tìm kiếm người dùng dựa trên post.idUser
    setUserOfPost(users.find((item) => post.idUser === item.id));
  }, [post.idUser, users]);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLike = () => {
    if (currentUser) {
      const updatedHasLiked = Array.isArray(currentUser.hasLiked)
        ? currentUser.hasLiked.includes(post.id)
          ? currentUser.hasLiked.filter(id => id !== post.id) // Xóa post.id nếu đã tồn tại
          : [...currentUser.hasLiked, post.id] // Thêm post.id nếu chưa tồn tại
        : [post.id]; // Khởi tạo mảng với post.id nếu chưa có mảng hasLiked
    
      setHasLiked(!hasLiked);
      onPostLike({
        ...currentUser,
        hasLiked: updatedHasLiked
      });
    }else{
      Swal.fire("Vui lòng đăng nhập để sử dụng tính năng này");
    }
  };

  const handleBookmark = () => {
    if (currentUser) {
      const updatedBookmarked = Array.isArray(currentUser.hasBookmarked)
        ? currentUser.hasBookmarked.includes(post.id)
          ? currentUser.hasBookmarked.filter(id => id !== post.id) // Xóa post.id nếu đã tồn tại trong bookmarked
          : [...currentUser.hasBookmarked, post.id] // Thêm post.id nếu chưa tồn tại trong bookmarked
        : [post.id]; // Khởi tạo mảng với post.id nếu chưa có mảng bookmarked
    
      setHasBookmarked(!hasBookmarked);
      onPostBookmark({
        ...currentUser,
        hasBookmarked: updatedBookmarked
      });
    }
    
    else{
      Swal.fire("Vui lòng đăng nhập để sử dụng tính năng này");
    }
  };

  const goToUserProfile = (id: string |undefined) => {
    router.push(`/profile/${id}?isSelf=0`);
  };
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };


  const handleOpenEditModal =()=>{
    setIsEditModalOpen(true);
  } 
   const handleCloseEditModal =()=>{
    setIsEditModalOpen(false);
  }
  const handleDeletePost = () => {
    Swal.fire({
      title: "Bài viết này sẽ bị xóa?",
      text: "Hành động này sẽ ko được khôi phục!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(post.id));
        Swal.fire({
          title: "Deleted!",
          text: "Bài viết đã bị xáo.",
          icon: "success"
        });
      }
    });
  };



  const handleCheckIsCreater = ()=>{
    return post?.idUser==currentUser?.id;
  }

  return (
    <div className="flex flex-col  h-full space-y-2 sm:space-y-0 no-scrollbar">
      {/* Header */}
      <div className="flex rounded-lg space-x-2 justify-between pb-5">
        <div
          className="flex space-x-2"
          onClick={() => goToUserProfile( userOfPost?.id)}
        >
          <div className="story-avatar">
            <a href="#" className="block bg-white rounded-full relative">
              <img
                className="w-8 h-8 rounded-full object-cover p-0.5 bg-black"
                src={userOfPost?.avatar}
              />
            </a>
          </div>
          <div className="flex pt-1">
            <div className="cursor-pointer font-sans text-sm font-semibold text-white self-center">
              {userOfPost?.name}
            </div>
            <div className="text-gray-500 w-5 font-sans text-md font-semibold self-center px-2">
              •
            </div>
            <div className="font-sans text-sm font-light text-[#949494] self-center">
              { convertTime((new Date().getTime()-post.createdAt)/60000)}
            </div>
          </div>
        </div>
        <div onClick={handleOpenUpdateModal} className="cursor-pointer self-end">
          <FontAwesomeIcon icon={faEllipsisH} />
        </div>
      </div>

      {/* Media */}
      <div className="min-h-72  px-0.5">
        {post.carouselMedia && <MediaCarousel mediaItems={post.carouselMedia} />}
      </div>

      {/* Actions */}
      <div className="flex justify-between pt-3">
        <div className="flex space-x-4">
          <span className="cursor-pointer hover:scale-90" onClick={handleLike}>
            <FontAwesomeIcon icon={hasLiked ? faHeart : faHeartRegular} />{" "}
            {/* Thay đổi icon like */}
          </span>
          <span className="cursor-pointer hover:scale-90" onClick={()=>onOpenCommentModal(post)}>
            <FontAwesomeIcon icon={faCommentRegular} />
          </span>

          <span className="cursor-pointer hover:scale-90">
            <FontAwesomeIcon icon={faShare} />
          </span>
        </div>
        <div className="cursor-pointer hover:scale-90" onClick={handleBookmark}>
          <FontAwesomeIcon
            icon={hasBookmarked ? faBookmark : faBookmarkRegular}
          />{" "}
          {/* Thay đổi icon bookmark */}
        </div>
      </div>

      {/* Likes */}
      <div className="cursor-pointer font-sans text-sm font-semibold text-white self-start">
        {post.likeCount >= 1
          ? `${post.likeCount} Likes`
          : "Be the first to like this"}
      </div>

      {/* Caption */}
      <div className="font-sans text-sm text-white flex-col">
        <p className="text-sm text-left indent-8 break-all ">{post.title}</p>
        {post && post.commentsById && post.commentsById?.length > 0 && (
          <p
            className="text-md text-left hidden sm:block text-gray-400 cursor-pointer"
            onClick={() => onOpenCommentModal(post)}
          >
            View all {post.commentsById?.length} comments
          </p>
        )}
      </div>
      {isUpdateModalOpen && (
        <UpdatePostModal
          isCreater={handleCheckIsCreater}
          onClose={handleCloseUpdateModal}
          onOpenDeleteModal={handleDeletePost}
          onOpenUploadModal={handleOpenEditModal}
        />
      )}
      {isEditModalOpen &&( <PostEditModal selectedImages={[]}  activePost={post} onClose={handleCloseEditModal}/>)}
  
    </div>
  );
};

export default Post;
