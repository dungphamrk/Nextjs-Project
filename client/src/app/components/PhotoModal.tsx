// components/Modal.tsx
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faX } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='modal'>
    <div onClick={()=>{onClose}} className='modal-close z-2'></div>
    <div className='flex flex-col gap-[20px] py-[20px] rounded-[10px] bg-[#262626] w-[400px] z-3'>
    <i onClick={()=>{onClose}} className="fa-solid fa-xmark z-3 text-[30px] cursor-pointer text-white top-[20px] right-[20px] absolute"></i>
        <div className='text-[16px] font-bold text-center'>Tạo bài viết mới</div>
        <hr/>
        <div className='flex flex-col items-center justify-center min-h-[300px] gap-[20px]'>
            <i className='bx bx-images text-[80px]'></i>
            <div className='text-[20px] text-center cursor-pointer'>Kéo ảnh và video vào đây</div>
            <form action="">
                 <input  className='hidden' type="file" id='post' multiple />
                 <label className='mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600' htmlFor="post">Chọn từ máy tính</label>
            </form> 
        </div>               
    </div>
  
</div>
  );
};

export default Modal;
