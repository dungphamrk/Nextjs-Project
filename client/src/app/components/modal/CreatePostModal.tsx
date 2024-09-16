import React, { useState } from "react";
import { useDispatch } from "react-redux";
import MediaCarousel from "../MediaCarousel";
// import { setPreviewImages } from '@/app/store/reducers/PreviewImagesReducer';
// import { setImagesPost } from '@/app/store/reducers/ImagesPostReducer';

interface ModalProps {
  onClose: () => void;
  onImageSelect: (images: string[]) => void;
}

export default function ModalCreatePost({ onClose,onImageSelect }: ModalProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const newPreviewImages: string[] = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const src = URL.createObjectURL(file);
        newPreviewImages.push(src);
      }
    }
    setPreviewImages([...previewImages, ...newPreviewImages]);
    onImageSelect(newPreviewImages);
  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay background */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative z-50 flex flex-col gap-[20px] p-[20px] rounded-[10px] bg-[#262626] w-[400px]">
        <i
          onClick={onClose}
          className="fa-solid fa-xmark text-[30px] cursor-pointer text-white absolute top-[20px] right-[20px]"
        ></i>
        <div className="text-[16px] font-bold text-center text-white">
          Tạo bài viết mới
        </div>
        <hr />
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-[20px]">
          <i className="bx bx-images text-[80px] text-gray-500"></i>
          <div className="text-[#b3b3b3] text-[20px] text-center cursor-pointer">
            Kéo ảnh và video vào đây
          </div>
        <form action="">
            <input
              onChange={handleChange}
              className="hidden"
              type="file"
              id="post"
              multiple
            />
            <label
              className="border-transparent bg-[rgb(0,149,246)] text-white rounded-[5px] p-[5px] cursor-pointer"
              htmlFor="post"
            >
              Chọn từ máy tính
            </label>
         
          </form> 
        </div>
      </div>
    </div>
  );
}
