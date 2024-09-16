// components/MediaCarousel.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PostMedia } from '@/app/interfaces/types'; // Đảm bảo rằng bạn đã khai báo interface PostMedia

interface MediaCarouselProps {
  mediaItems: PostMedia[];
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({ mediaItems }) => {
  if (!mediaItems || mediaItems.length === 0) {
    return <div>No media items available.</div>;
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1));
  };

  const currentMedia = mediaItems[currentIndex];

  return (
    <div className="relative w-full max-w-2xl mx-auto">

     {mediaItems.length> 1 ? (<button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg focus:outline-none z-10"
        onClick={handlePrev}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>) : ""} 
      <div className="flex justify-center items-center overflow-hidden relative">
        {currentMedia.type === 'image' ? (
          <img src={currentMedia.mediaUrl}  className="w-full h-full" />
        ) : (
          <video src={currentMedia.mediaUrl} controls className="w-full h-full">
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      {mediaItems.length>1 ?
      (<button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg focus:outline-none z-10"
        onClick={handleNext}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>)
       :""}
    </div>
  );
};

export default MediaCarousel;
