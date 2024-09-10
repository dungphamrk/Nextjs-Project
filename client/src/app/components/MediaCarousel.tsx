import React, { useEffect, useRef, useState } from 'react';

interface PostMedia {
  index: number;
  title: string;
  mediaUrl: string;
  type: 'image' | 'video';
}

interface MediaCarouselProps {
  medias: PostMedia[];
  autoNextTimeInterval?: number;
  style?: string;
  onNext?: () => void;
  onPrev?: () => void;
  onReset?: () => void;
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({
  medias,
  autoNextTimeInterval = 0,
  style = '',
  onNext,
  onPrev,
  onReset,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number>(medias[0].index + 1);
  const [prevIndex, setPrevIndex] = useState<number>(medias.length - 1);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const videoElements = useRef<HTMLVideoElement[]>([]);

  const autoTimedNextMedia = (interval: number = autoNextTimeInterval) => {
    moveToNextMedia();
    setTimeout(() => autoTimedNextMedia(interval), interval);
  };

  const moveToNextMedia = () => {
    if (currentIndex === medias.length - 1) {
      setCurrentIndex(0);
      setNextIndex(1);
      setPrevIndex(medias.length - 1);
    } else {
      setCurrentIndex(currentIndex + 1);
      setNextIndex(currentIndex + 2 > medias.length - 1 ? 0 : currentIndex + 2);
      setPrevIndex(currentIndex);
    }
    onNext && onNext();
  };

  const moveToPrevMedia = () => {
    if (currentIndex === 0) {
      setCurrentIndex(medias.length - 1);
      setPrevIndex(medias.length - 2);
      setNextIndex(0);
    } else {
      setCurrentIndex(currentIndex - 1);
      setPrevIndex(currentIndex - 2 < 0 ? medias.length - 1 : currentIndex - 2);
      setNextIndex(currentIndex);
    }
    onPrev && onPrev();
  };

  const resetCarouselIndexes = (index: number) => {
    setNextIndex(index + 1 > medias.length - 1 ? 0 : index + 1);
    setPrevIndex(index === 0 ? medias.length - 1 : index - 1);
    setCurrentIndex(index);
    onReset && onReset();
  };

  const toggleVideoMute = (index: number) => {
    if (videoElements.current[index]) {
      videoElements.current[index].muted = !videoElements.current[index].muted;
      setIsVideoMuted(!videoElements.current[index].muted);
    }
  };

  const playVideo = (index: number) => {
    const video = videoElements.current[index];
    if (video) {
      video.play();
      setIsVideoPlaying(true);
    }
  };

  const pauseVideo = (index: number) => {
    const video = videoElements.current[index];
    if (video) {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  useEffect(() => {
    if (autoNextTimeInterval !== 0) {
      const timer = setTimeout(() => autoTimedNextMedia(autoNextTimeInterval), 5000);
      return () => clearTimeout(timer);
    }
    resetCarouselIndexes;
  }, []);
  console.log(currentIndex);
  console.log(prevIndex);
  console.log(nextIndex);
  
  
  console.log(medias.length);
  console.log(medias[0].index);
  

  return (
    <div className="relative h-full">
      <div className={`relative overflow-hidden h-full  object-cover object-center ${style}`}>
        {medias.map((media) => (
          
          <div
            key={`carousel-media-${media.index}`}
            id={`carousel-item-${media.index}`}
            className={`duration-300 ease-in-out absolute inset-0 transition-all transform ${
              currentIndex === media.index ? 'translate-x-0 z-20' : prevIndex === media.index ? '-translate-x-full z-10' : 'translate-x-0 z-20'
            } ${currentIndex !== media.index && prevIndex !== media.index && nextIndex !== media.index ? 'hidden' : ''}`}
          >
      
            <span className="absolute text-2xl font-semibold text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:text-3xl">
              {media.index}
            </span>
           
            {media.type === 'image' && (
              <img
                src={media.mediaUrl}
                alt={media.title}
                className="absolute block w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded"
              />
            )}

            {media.type === 'video' && (
              <video
                ref={(el :any) => (videoElements.current[media.index] = el!)}
                muted={isVideoMuted}
                className="absolute block w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <source src={media.mediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {/* Mute Button */}
            {media.type === 'video' && (
              <button
                className="absolute bottom-0 right-0 z-40 flex items-center justify-center cursor-pointer"
                onClick={() => toggleVideoMute(media.index)}
              >
                <span className="inline-flex items-center justify-center rounded-full sm:w-6 sm:h-6 bg-gray-600">
                  <i className={`fa-solid text-sm text-gray-300 ${isVideoMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}></i>
                </span>
              </button>
            )}

            {/* Play/Pause Button */}
            {media.type === 'video' && (
              <button
                className="absolute top-0 left-1/2 right-1/2 z-30 flex items-center justify-center h-full cursor-pointer"
                onClick={() => (isVideoPlaying ? pauseVideo(media.index) : playVideo(media.index))}
              >
                <span className="inline-flex items-center justify-center rounded-full sm:w-12 sm:h-12">
                  <i className={`fa-solid text-6xl text-gray-300 ${isVideoPlaying ? '' : 'fa-play'}`}></i>
                </span>
              </button>
            )}

            {/* Previous Button */}
            {medias.length > 1 && (
              <button className="absolute top-0 left-0 z-30 flex items-center justify-center h-full cursor-pointer" onClick={moveToPrevMedia}>
                <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
                  <i className="fa-solid fa-circle-chevron-left text-2xl text-gray-300"></i>
                </span>
              </button>
            )}

            {/* Next Button */}
            {medias.length > 1 && (
              <button className="absolute top-0 right-0 z-30 flex items-center justify-center h-full cursor-pointer" onClick={moveToNextMedia}>
                <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
                  <i className="fa-solid fa-circle-chevron-right text-2xl text-gray-300"></i>
                </span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaCarousel;
