import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus, faHeart, faCircle } from '@fortawesome/free-solid-svg-icons'; // Import icons
import Image from 'next/image';

const TopNavBar = () => {
  const router = useRouter();
  const [isDropDownTriggered, setIsDropDownTriggered] = useState(false);
  const [routeName, setRouteName] = useState('');

  const toggleDropDown = () => {
    setIsDropDownTriggered(!isDropDownTriggered);
  };

  const onPageBack = () => {
    const historyCount = window.history.length;
    setTimeout(() => {
      if (historyCount > 0) {
        router.push('/home');
      } else {
        router.back();
      }
    }, 1000);
  };

  const unsupportedFeature = () => {
    alert('This feature is not supported yet');
  };

  const onToggle = () => {
    // Trigger your file upload dialog logic here
    console.log('File upload dialog triggered');
  };

  useEffect(() => {
    const currentRoute = router.pathname === '/profile' ? router.query.username : router.pathname;
    setRouteName(currentRoute?.toString() || '');
  }, [router.pathname, router.query]);

  return (
    <div className="flex flex-col space-x-2 justify-around sticky top-0 md:hidden z-50 bg-black border-gray-800 border-t border-b">
      <div className="flex space-x-2 justify-between relative">
        <div className="group cursor-pointer rounded-full flex space-x-4 sm:hover:bg-slate-1000 p-3 xl:justify-start justify-center">
          {routeName !== '/home' ? (
            <span className="rotate-[270deg]">
              <FontAwesomeIcon icon={faArrowLeft} className="group-hover:scale-110" onClick={onPageBack} />
            </span>
          ) : (
            <Image className="w-32 h-7" src="/path-to-your-logo/icon-dark.png" alt="Logo" width={128} height={28} />
          )}
        </div>

        {routeName === '/home' ? (
          <div className="flex space-x-0.5">
            <div
              onClick={toggleDropDown}
              className="group cursor-pointer rounded-full flex space-x-4 sm:hover:bg-slate-1000 pt-3 xl:justify-start justify-center"
            >
              <FontAwesomeIcon icon={faPlus} className="group-hover:scale-110" />
            </div>

            <div
              onClick={() => router.push('/notifications')}
              className="group cursor-pointer rounded-full flex space-x-4 sm:hover:bg-slate-1000 p-3 xl:justify-start justify-center"
            >
              <FontAwesomeIcon icon={faHeart} className="group-hover:scale-110" />
            </div>
          </div>
        ) : (
          <div className="font-sans text-md font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ml-12 text-white">
            <span className="capitalize">{routeName}</span>
          </div>
        )}
      </div>

      {/* Drop Down Menu */}
      {isDropDownTriggered && (
        <div className="absolute right-5 z-50 md:hidden bg-slate-1100 divide-y divide-gray-100 rounded-lg shadow w-24">
          <div className="flex flex-col pt-2 pb-2 text-sm text-gray-200 space-y-3">
            <div onClick={onToggle} className="flex justify-evenly cursor-pointer">
              <span>Post</span>
              <FontAwesomeIcon icon={faCircle} className="self-end group-hover:scale-100" />
            </div>

            <div onClick={unsupportedFeature} className="flex justify-evenly">
              <span>Story</span>
              <FontAwesomeIcon icon={faCircle} className="self-end group-hover:scale-100" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNavBar;
