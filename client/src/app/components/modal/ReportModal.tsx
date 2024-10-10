import React from 'react';

interface ReportModalProps {
  onClose: () => void;
  onSelectReason: (reason: string) => void;
}

const reasons = [
  'Đây là spam',
  'Ảnh khỏa thân hoặc hoạt động tình dục',
  'Biểu tượng hoặc ngôn từ gây thù ghét',
  'Bạo lực hoặc tổ chức nguy hiểm',
  'Bán hàng hóa phi pháp hoặc thuộc diện kiểm soát',
  'Bắt nạt hoặc quấy rối',
  'Vi phạm quyền sở hữu trí tuệ',
  'Tự tử hoặc tự gây thương tích',
  'Rối loạn ăn uống',
  'Lừa đảo hoặc gian lận',
  'Chất cấm, chất gây nghiện',
  'Thông tin sai sự thật',
  'Chỉ là tôi không thích nội dung này',
];

export default function ReportModal({ onClose, onSelectReason }: ReportModalProps) {
  return (
    <div className='modal fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
      <div onClick={onClose} className='modal-close absolute inset-0'></div>
      <div className='flex flex-col p-4 bg-gray-800 rounded-lg w-[400px] max-h-[500px] overflow-y-auto relative'>
        <i
          onClick={onClose}
          className='fa-solid fa-xmark absolute top-4 right-4 text-[24px] cursor-pointer text-gray-300 hover:text-gray-100'
        ></i>
        <h2 className='text-center text-gray-200 text-xl mb-4'>
          Tại sao bạn báo cáo bài viết này?
        </h2>
        <ul className='flex flex-col gap-3'>
          {reasons.map((reason, index) => (
            <li
              key={index}
              onClick={() => onSelectReason(reason)}
              className='flex justify-between items-center cursor-pointer text-gray-300 hover:text-gray-100 p-2 rounded bg-gray-700 hover:bg-gray-600'
            >
              {reason}
              <i className='fa-solid fa-chevron-right text-gray-400'></i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
