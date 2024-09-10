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
import EmojiPickerModal from "./modal/EmojiPickerModal";
import MediaCarousel from "./MediaCarousel";
import { PostMedia } from "@/app/interfaces/types";

export interface PostCard {
  id: string;
  userName: string;
  profilePictureUrl: string;
  createdAt: string;
  carouselMedia: PostMedia[];
  caption: string;
  commentCount: number;
  likeCount: number;
  hasLiked: boolean;
  hasBookmarked: boolean; // Trạng thái bookmark
}

interface PostProps {
  post: PostCard;
  isCommentAreaVisible?: boolean;
  onOpenCommentModal: (post: PostCard) => void;
  onPostLike: (post: PostCard) => void;
  onPostBookmark: (post: PostCard) => void; // Callback khi bookmark
  onPostComment: (comment: string, postId: string) => void;
}

const Post: React.FC<PostProps> = ({
  post,
  isCommentAreaVisible = true,
  onOpenCommentModal,
  onPostLike,
  onPostBookmark,
  onPostComment,
}) => {
  const [comment, setComment] = useState("");
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [hasLiked, setHasLiked] = useState(post.hasLiked);
  const [hasBookmarked, setHasBookmarked] = useState(post.hasBookmarked); // Trạng thái bookmark

  const router = useRouter();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLike = () => {
    setHasLiked(!hasLiked);
    onPostLike({ ...post, hasLiked: !hasLiked });
  };

  const handleBookmark = () => {
    setHasBookmarked(!hasBookmarked); // Đổi trạng thái bookmark
    onPostBookmark({ ...post, hasBookmarked: !hasBookmarked }); // Truyền post với trạng thái bookmark mới
  };

  const handleCommentSubmit = () => {
    onPostComment(comment, post.id);
    setComment("");
  };

  const appendEmoji = (emoji: string) => {
    setComment(comment + emoji);
  };

  const goToUserProfile = (userName: string) => {
    router.push(`/profile/${userName}?isSelf=0`);
  };

  return (
    <div className="flex flex-col  h-full space-y-2 sm:space-y-0 no-scrollbar">
      {/* Header */}
      <div className="flex rounded-lg space-x-2 justify-between pb-5">
        <div
          className="flex space-x-2"
          onClick={() => goToUserProfile(post.userName)}
        >
          <div className="story-avatar">
            <a href="#" className="block bg-white rounded-full relative">
              <img
                className="w-8 h-8 rounded-full object-cover p-0.5 bg-black"
                src={post.profilePictureUrl}
              />
            </a>
          </div>
          <div className="flex pt-1">
            <div className="cursor-pointer font-sans text-sm font-semibold text-white self-center">
              {post.userName}
            </div>
            <div className="text-gray-500 w-5 font-sans text-md font-semibold self-center px-2">
              •
            </div>
            <div className="font-sans text-sm font-light text-[#949494] self-center">
              {post.createdAt}
            </div>
          </div>
        </div>
        <div className="cursor-pointer self-end">
          <FontAwesomeIcon icon={faEllipsisH} />
        </div>
      </div>

      {/* Media */}
      <div className="min-h-72  px-0.5">
        {post.carouselMedia && <MediaCarousel medias={post.carouselMedia} />}
      </div>

      {/* Actions */}
      <div className="flex justify-between pt-3">
        <div className="flex space-x-4">
          <span className="cursor-pointer hover:scale-90" onClick={handleLike}>
            <FontAwesomeIcon icon={hasLiked ? faHeart : faHeartRegular} />{" "}
            {/* Thay đổi icon like */}
          </span>
          <span className="cursor-pointer hover:scale-90">
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
        <p className="text-sm text-left indent-8 break-all ">{post.caption}</p>
        {post.commentCount > 0 && (
          <p
            className="text-md text-left hidden sm:block text-gray-400 cursor-pointer"
            onClick={() => onOpenCommentModal(post)}
          >
            View all {post.commentCount} comments
          </p>
        )}
      </div>

      {/* Comment Form */}
      {isCommentAreaVisible && (
        <div className="flex border-b border-slate-800 justify-between ">
          <span className="basis-4/5">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={1}
              className="outline-none resize-none border-none text-white block w-full text-sm bg-black placeholder:text-gray-1100"
              placeholder="Add a comment..."
              onKeyPress={(e) => e.key === "Enter" && handleCommentSubmit()}
            />
          </span>
          {comment.length > 0 && (
            <span
              className="font-sans text-md text-sky-500 cursor-pointer hover:text-white h-6"
              onClick={handleCommentSubmit}
            >
              Post
            </span>
          )}
          <span className="relative cursor-pointer">
            <EmojiPickerModal onSelectEmoji={appendEmoji} />
          </span>
        </div>
      )}
    </div>
  );
};

export default Post;
