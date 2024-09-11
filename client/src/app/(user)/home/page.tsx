"use client";
import RightNavbar from "@/app/components/navbar/RightNavbar";
import Post, { PostCard } from "@/app/components/Post";
import { useState } from "react";

const samplePost: PostCard[] = [
  {
    id: "2",
    userName: "john_doe",
    profilePictureUrl:
      "https://th.bing.com/th/id/OIP.n2J-te2edVD91F8w6udMmgHaHa?rs=1&pid=ImgDetMain",
    createdAt: "2024-09-05",
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
    caption: "Đây là chú thích của bài viết!",
    commentCount: 15,
    likeCount: 120,
    hasLiked: false,
    hasBookmarked: false,
  },
  {
    id: "1",
    userName: "john_doe",
    profilePictureUrl:
      "https://th.bing.com/th/id/OIP.n2J-te2edVD91F8w6udMmgHaHa?rs=1&pid=ImgDetMain",
    createdAt: "2024-09-05",
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
    caption: "Đây là chú thích của bài viết!",
    commentCount: 15,
    likeCount: 120,
    hasLiked: false,
    hasBookmarked: false,
  },
];

export default function Home() {
  const [posts, setPosts] = useState<PostCard[]>(samplePost);

  const handlePostLike = (post: PostCard) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === post.id ? { ...p, hasLiked: !p.hasLiked } : p
      )
    );
  };

  const handleOpenCommentModal = (post: PostCard) => {
    console.log("Open comments for", post.carouselMedia);
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
                onOpenCommentModal={handleOpenCommentModal}
                onPostLike={handlePostLike}
                onPostComment={handlePostComment}
                onPostBookmark={handleOpenCommentModal}
              />
            ))}
          </div>  
           <RightNavbar />
        </div>
    </>
  );
}
