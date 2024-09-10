"use client"
import { useState, useEffect, useRef } from "react";
import EmojiPickerModal from "@/app/components/EmojiPickerModal";
import MediaCarousel from "@/app/components/MediaCarousel";
import { ModalSize, PostCard } from "@/app/interfaces/types";
import CommentCard from "@/app/components/CommentCard";
import { faEllipsisH, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface Props {
    appendEmoji: (emoji: string) => void; // Thêm prop này
    isToggled: boolean;
    modalSize: ModalSize; 
  }



export const CommentModal: React.FC<Props> = ({
  isToggled,
  modalSize = ModalSize.ExtraLarge,
  
}) => {
    
    const [activePost, setActivePost] = useState<PostCard>({
        id: "1",
        userName: 'John Doe',
        profilePictureUrl: 'https://loremflickr.com/1024/1280/cat',
        content: 'This is a sample post content.',
        createdAt: '2024-09-09T12:00:00Z',
        likeCount: 5,
        hasLiked: false,
        comments: [
            {
                id: 1,
                userName: 'Jane Smith',
                profilePictureUrl: 'https://loremflickr.com/1024/1280/cat',
                content: 'Great post!',
                createdAt: '2024-09-09T12:30:00Z',
            },
        ],
        carouselMedia: [
            {
                index: 0,
                title: 'Sample Image',
                mediaUrl: 'https://loremflickr.com/1024/1280',
                type: 'image',
            },
            {
              index: 1,
              title: 'Sample Image',
              mediaUrl: 'https://loremflickr.com/1024/1280',
              type: 'image',
          },
        ],
        title: 'Sample Post Title',
        updatedAt: '2024-09-09T12:00:00Z',
    });
    
  const [commentForm, setCommentForm] = useState<string>("");
  const commentFormElementRef = useRef<HTMLTextAreaElement>(null);

  const numberOfLikes = activePost?.likeCount
    ? `${activePost.likeCount} Likes`
    : "Be the first to like this";


  const appendEmoji = (emoji: string) => {
    setCommentForm(commentForm + emoji);
};

  const focusTextArea = () => {
    commentFormElementRef.current?.focus();
  };

  const resetCommentValue = () => {
    setCommentForm("");
  };

  const onAddComment = () => {
    if (commentForm) {
      // Emit add comment
      if (!activePost) return;
      const newComment = {
        id: 0,
        userName: "Godwin Ekuma",
        profilePictureUrl: "https://loremflickr.com/1024/1280/cat",
        content: commentForm,
        createdAt: "2012-02-23",
      };
      activePost.comments?.push(newComment); // TODO: Replace this with real API logic
      resetCommentValue();
      scrollToTheLatestComment();
    }
  };

  const onDeleteComment = (commentId: number) => {
    // Emit delete comment
  };

  const onCommentLiked = (commentId: number) => {
    // Emit comment liked
  };


console.log(activePost.carouselMedia);

  const scrollToTheLatestComment = () => {
    const target = document.getElementById("last-comment");
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`transition ${isToggled ? "" : "hidden"}  `}>
      {/* Desktop Modal Header */}     
      <div
        className={`fixed inset-x-0 top-5 right-0 ${
          isToggled ? "md:block" : ""
        } hidden`}
      >
        <div className="md:mr-12 flex items-center justify-between cursor-pointer">
          <span className="ml-auto inline-flex text-white">
          <FontAwesomeIcon icon={faX} />
          </span>
        </div>
      </div>

      {/* Modal Body */}
      <div
        className={`w-full z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          ${modalSize === ModalSize.SuperSmall ? "max-w-xs" : ""}
          ${modalSize === ModalSize.ExtraSmall ? "max-w-sm" : ""}
          ${modalSize === ModalSize.Small ? "max-w-md" : ""}
          ${modalSize === ModalSize.Medium ? "max-w-lg" : ""}
          ${modalSize === ModalSize.Large ? "max-w-5xl " : ""}
          ${modalSize === ModalSize.ExtraLarge ? "max-w-16xl" : ""}`}
      >
        {/* Mobile Modal Header */}
        <div className="md:hidden block">
          <div className="flex justify-between cursor-pointer bg-black w-full p-3 border-b border-gray-700">
            <span className="font-sans text-md font-semibold text-white">
              Comments
            </span>
            <span>
              <p>icon</p>
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="container mx-auto z-50 block w-full overflow-x-hidden overflow-y-auto md:inset-0">
          <div className="relative bg-black flex md:flex-row flex-col">
            {/* Carousel Container */}
            <div className="md:p-0 md:block p-2 w-full min-h-full ">
                {activePost.carouselMedia &&  <MediaCarousel medias={activePost?.carouselMedia }/>}
            </div>
       


            {/* Comment Container */}
            <div className="flex flex-col h-[600px] sm:space-y-4 lg:basis-7/12 sm:basis-10/12 z-50 sm:border-l border-slate-800 sm:p-2">
              <div className="flex flex-col sm:space-x-1 justify-between sm:p-2">
                {/* Username, DaysSinceUpload, Options for screens > 640px */}
                <div className="sm:block hidden">
                  <div className="flex justify-between border-b border-slate-800 p-3">
                    <div className="flex space-x-2">
                      <div className="story-avatar">
                        <a
                          href="#"
                          className="block bg-white rounded-full relative"
                        >
                          <img
                            className="w-8 h-8 rounded-full object-cover p-0.5"
                            src={activePost?.profilePictureUrl}
                          />
                        </a>
                      </div>

                      <div className="flex pt-1">
                        <div className="cursor-pointer font-sans text-sm font-semibold text-white self-center">
                          {activePost?.userName}
                        </div>
                        <div className="text-gray-500 w-5 font-sans text-md font-semibold self-center px-2">
                          •
                        </div>
                        <div className="font-sans text-sm font-light text-[#949494] self-center">
                          {activePost?.createdAt}
                        </div>
                      </div>
                    </div>
                    <div className="cursor-pointer">
                    <FontAwesomeIcon icon={faEllipsisH} />
                    </div>
                  </div>
                </div>

                {/* Comment form for screens < 640px */}
                <div className="block sm:hidden">
                  <div className="flex justify-between border-b border-t border-slate-700 bg-slate-1100 p-2.5 space-x-4">
                    <div className="flex">
                      <img
                        src={activePost?.profilePictureUrl}
                        className="cursor-pointer h-10 w-10 rounded-full shadow-lg"
                      />
                    </div>
                    <div className="flex w-full relative">
                      <input
                        value={commentForm}
                        onChange={(e) => setCommentForm(e.target.value)}
                        type="text"
                        className="bg-black border border-slate-800 text-white text-sm rounded-full w-full p-3"
                        placeholder="Add a comment..."
                        onClick={onAddComment}
                      />
                      <div
                        className={`absolute inset-y-0 right-5 flex items-center pl-3 pointer-events-none font-semibold ${
                          commentForm
                            ? "text-sky-500 sm:cursor-pointer"
                            : "text-white"
                        }`}
                      >
                        Post
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment Rendering */}
              <div className="lg:max-h-[600px] sm:max-h-[211px] h-screen sm:p-1 space-y-7 overflow-y-auto scrollbar scrollbar-none">
                {activePost &&
                activePost.comments &&
                activePost.comments.length > 0 ? (
                  activePost.comments.map((comment, index) => (
                    <CommentCard
                      key={comment.id}
                      id={ activePost &&
                        activePost.comments && 
                        index === activePost.comments?.length - 1
                          ? "last-comment"
                          : ""
                      }
                      comment={comment}
                      onCommentLike={onCommentLiked}
                    />
                  ))
                ) : (
                  <div className="flex flex-col space-y-2">
                    <span className="font-sans lg:text-2xl md:text-md text-white font-bold self-center">
                      No comments yet.
                    </span>
                    <span className="font-sans text-sm text-white font-normal self-center">
                      Start the conversation.
                    </span>
                  </div>
                )}
              </div>

              {/* Comment Actions */}
              <div className="sm:block hidden">
                <div className="flex justify-between p-2 border-t border-slate-800">
                  <div
                    className="cursor-pointer text-white"
                  >
                    <p>icon</p>
                    {numberOfLikes}
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="cursor-pointer">
                    <EmojiPickerModal onSelectEmoji={appendEmoji} />

                    </div>
                    <textarea
                      ref={commentFormElementRef}
                      value={commentForm}
                      onChange={(e) => setCommentForm(e.target.value)}
                      placeholder="Add a comment..."
                      rows={1}
                      className="font-sans resize-none scrollbar-hide overflow-hidden block w-full rounded-2xl border border-slate-800 bg-black p-3 text-sm text-white"
                      onFocus={focusTextArea}
                    />
                    <button
                      onClick={onAddComment}
                      className={`font-sans text-sm font-semibold ${
                        commentForm
                          ? "text-sky-500 cursor-pointer"
                          : "text-white"
                      }`}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
