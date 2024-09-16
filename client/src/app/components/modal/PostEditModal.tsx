"use client";
import { useState, useEffect, useRef } from "react";
import MediaCarousel from "@/app/components/MediaCarousel";
import { PostCard, PostMedia, User } from "@/app/interfaces/types";
import { faEllipsisH, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addPost, updatePost } from "@/app/store/reducers/postsSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, UserState } from "@/app/store/reducers/userSlice";
import { storage } from "@/config/firebases";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Props {
  onClose: () => void;
  activePost: PostCard | undefined;
  selectedImages: string[]; // Hình ảnh đã chọn từ modal tạo bài viết
}

export const PostEditModal: React.FC<Props> = ({
  onClose,
  activePost,
  selectedImages, // Nhận hình ảnh từ modal tạo bài viết
}) => {
  const [description, setDescription] = useState<string>(""); // State lưu mô tả
  const descriptionFormElementRef = useRef<HTMLTextAreaElement>(null);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const dispatch = useDispatch();
  const users = useSelector((state: { users: UserState }) => state.users.users);
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
  // Chuyển đổi selectedImages thành PostMedia
  const newPosts: PostMedia[] = selectedImages.map(
    (imageUrl: string, index: number) => ({
      index: index + 1, // Tạo index bắt đầu từ 1
      mediaUrl: imageUrl, // Đường dẫn ảnh
      type: "image", // Định dạng là ảnh
    })
  );

  useEffect(() => {
    if (activePost) {
      setDescription(activePost.title || ""); // Khởi tạo mô tả nếu có sẵn
    } else {
      setDescription(""); // Reset mô tả khi tạo mới
    }
  }, [activePost]);

  const focusTextArea = () => {
    descriptionFormElementRef.current?.focus();
  };

// upfirebase
const uploadImage = async (file: File): Promise<string> => {
  const imageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(imageRef, file);
  const downloadURL = await getDownloadURL(imageRef);
  return downloadURL;
};

const onSaveDescription = async () => {
  if (description) {
    // Chuyển đổi selectedImages thành các đối tượng File để tải lên Firebase Storage
    const imageFiles = selectedImages.map((imageUrl) => {
      return fetch(imageUrl)
        .then((res) => res.blob())
        .then((blob) => new File([blob], `image-${Date.now()}.jpg`, { type: blob.type }));
    });

    // Tải ảnh lên Firebase và lấy URL
    const imageUrls = await Promise.all((await Promise.all(imageFiles)).map((file) => uploadImage(file)));

    if (activePost) {
      // Cập nhật thông tin bài viết cũ
      dispatch(
        updatePost({
          ...activePost,
          title: description,
          carouselMedia: imageUrls.map((url, index) => ({
            index: index + 1,
            mediaUrl: url,
            type: "image",
          })),
        })
      );
    } else {
      // Tạo bài viết mới
      dispatch(
        addPost({
          id: uuidv4(),
          title: description,
          idUser: `${currentUser?.id}`,
          carouselMedia: imageUrls.map((url, index) => ({
            index: index + 1,
            mediaUrl: url,
            type: "image",
          })),
          createdAt: new Date().getTime(),
          likeCount: 0,
          comments: [],
        })
      );
    }
  }
  onClose();
};


  return (
    <div className={`fixed inset-0 z-50`}>
      {/* Nền mờ */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Header */}
      <div className={`fixed inset-x-0 top-5 right-0 hidden`}>
        <div className="md:mr-12 flex items-center justify-between cursor-pointer">
          <button onClick={onClose} className="ml-auto inline-flex text-white">
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
      </div>

      {/* Modal Body */}
      <div
        className={`w-full z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      >
        {/* Nội dung Modal */}
        <div className="container mx-auto z-50 block w-full overflow-x-hidden overflow-y-auto md:inset-0">
          <div className="relative bg-black flex md:flex-row flex-col">
            {/* Carousel cho ảnh */}
            <div className="md:p-0 md:block p-2 w-full min-h-full">
              {selectedImages && selectedImages.length > 0 ? (
                <MediaCarousel mediaItems={newPosts} />
              ) : (
                activePost &&
                activePost.carouselMedia && (
                  <MediaCarousel mediaItems={activePost.carouselMedia} />
                )
              )}
            </div>

            {/* Khu vực nhập mô tả */}
            <div className="flex flex-col h-[600px] sm:space-y-4 lg:basis-7/12 sm:basis-10/12 z-50 sm:border-l border-slate-800 sm:p-2">
              <div className="flex flex-col sm:space-x-1 justify-between sm:p-2">
                {/* Tên người dùng, Thời gian tải lên, Tuỳ chọn */}
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
                            src={currentUser?.avatar}
                          />
                        </a>
                      </div>

                      <div className="flex pt-1">
                        <div className="cursor-pointer font-sans text-sm font-semibold text-white self-center">
                          {currentUser?.name}
                        </div>
                        <div className="text-gray-500 w-5 font-sans text-md font-semibold self-center px-2">
                          •
                        </div>
                      </div>
                    </div>
                    <div className="cursor-pointer">
                      <FontAwesomeIcon icon={faEllipsisH} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Khu vực nhập mô tả */}
              <div className="flex flex-col p-4 space-y-4">
                <textarea
                  ref={descriptionFormElementRef}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Viết mô tả..."
                  rows={6}
                  className="resize-none block w-full rounded-lg border border-slate-800 bg-black p-4 text-sm text-white"
                />

                <button
                  onClick={onSaveDescription}
                  className={`w-full py-2 text-center font-sans text-sm font-semibold ${
                    description
                      ? "bg-sky-500 text-white cursor-pointer"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!description}
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
