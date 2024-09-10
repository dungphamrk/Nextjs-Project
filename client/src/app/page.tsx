"use client";
import React, { useState } from "react";
import { CommentModal } from "./components/modal/CommentModal";
import { ModalSize, PostCard } from "./interfaces/types";

export default function page() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activePost, setActivePost] = useState<PostCard>({
    id: "1",
    userName: "John Doe",
    profilePictureUrl: "https://loremflickr.com/1024/1280/cat",
    content: "This is a sample post content.",
    createdAt: "2024-09-09T12:00:00Z",
    idUser:"1",
    likeCount: 5,
    hasLiked: false,
    comments: [
      {
        id: 0,
        userName: "Jane Smith",
        profilePictureUrl: "https://loremflickr.com/1024/1280/cat",
        content: "Great post!",
        createdAt: "2024-09-09T12:30:00Z",
      },
    ],
    carouselMedia: [
      {
        index: 0,
        title: "Beautiful Sunset",
        mediaUrl:
          "https://th.bing.com/th/id/OIP.n2J-te2edVD91F8w6udMmgHaHa?rs=1&pid=ImgDetMain",
        type: "image",
      },
      {
        index: 1,
        title: "Mountain Hike",
        mediaUrl:
          "https://th.bing.com/th/id/OIP.n2J-te2edVD91F8w6udMmgHaHa?rs=1&pid=ImgDetMain",
        type: "video",
      },
    ],
    title: "Sample Post Title",
    updatedAt: "2024-09-09T12:00:00Z",
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Open Comment Modal
      </button>

      {isModalOpen && (
        <CommentModal
          isToggled={isModalOpen}
          modalSize={ModalSize.Large} // You can use different sizes if needed
          appendEmoji={(emoji: any) => {
            console.log("Emoji added:", emoji);
          }}
        />
      )}
    </div>
  );
}
