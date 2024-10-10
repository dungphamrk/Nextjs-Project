import React, { useState } from 'react';
import ReportModal from './ReportModal';

interface UpdatePostModalProps {
  onClose: () => void;
  onOpenDeleteModal: () => void;
  onOpenUploadModal: () => void;
  isCreater: ()=>boolean;
}

export default function UpdatePostModal({
  onClose,
  onOpenDeleteModal,
  onOpenUploadModal,
  isCreater,
}: UpdatePostModalProps) {
  const [isOpenReportModal,setIsOpenReportModal] =useState <Boolean>(false);
  const onOpenReportModal = ()=>{
    setIsOpenReportModal(true)
  }
  const handleCloseReportModal = () =>{
    setIsOpenReportModal(false);
  }
  function handleSelectReason(reason: string) {
    console.log('Selected reason:', reason);
  }
 
  return (
    <div className='modal fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
      <div onClick={onClose} className='modal-close absolute inset-0'></div>
      <div className='flex flex-col gap-4 p-6 rounded-lg bg-gray-800 w-[400px] relative'>
        <i
          onClick={onClose}
          className='fa-solid fa-xmark absolute top-4 right-4 text-[24px] cursor-pointer text-gray-300 hover:text-gray-100'
        ></i>
        
        {isCreater() ? (
          <>
            <div
              onClick={onOpenDeleteModal}
              className='text-center cursor-pointer text-gray-300 hover:text-gray-100'
            >
              Xóa bài viết
            </div>
            <hr className='border-gray-600' />
            <div
              onClick={onOpenUploadModal}
              className='text-center cursor-pointer text-gray-300 hover:text-gray-100'
            >
              Sửa bài viết
            </div>
       
            <hr className='border-gray-600' />
            <div
              onClick={onClose}
              className='text-center cursor-pointer text-gray-300 hover:text-gray-100'
            >
              Hủy
            </div>
          </>
        ) : (
          <>
            <div onClick={onOpenReportModal} className='text-center cursor-pointer text-gray-300 hover:text-gray-100'>
              Báo cáo
            </div>
            <hr className='border-gray-600' />
            <div
              onClick={onClose}
              className='text-center cursor-pointer text-gray-300 hover:text-gray-100'
            >
              Hủy
            </div>
          </>
        )}
      </div>
      {isOpenReportModal && (<ReportModal onClose={handleCloseReportModal} onSelectReason={handleSelectReason}/>)}
    </div>
  );
}
