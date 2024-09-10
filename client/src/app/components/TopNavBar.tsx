// TopNavBar.tsx (Next.js)
"use client"
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBell, faPlus } from '@fortawesome/free-solid-svg-icons';

const TopNavBar = () => {
    const [isDropDownTriggered, setIsDropDownTriggered] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const onPageBack = () => {
        if (window.history.length > 0) {
            router.back();
        } else {
            router.push('/home');
        }
    };

    const triggerDropDown = () => {
        setIsDropDownTriggered(!isDropDownTriggered);
    };

    return (
        <div className="sticky top-0 z-50 bg-black border-gray-800 border-t border-b">
            <div className="flex justify-between relative">
                <div className="p-3 cursor-pointer" onClick={onPageBack}>
                    {pathname !== '/home' ? (
                        <FontAwesomeIcon icon={faArrowLeft} className="w-6 h-6 rotate-270" />
                    ) : (
                        <img src="/path/to/logo.png" alt="Logo" className="w-32 h-7" />
                    )}
                </div>
                
                {pathname === '/home' && (
                    <div className="flex space-x-2">
                        <div onClick={triggerDropDown} className="cursor-pointer p-3">
                            <FontAwesomeIcon icon={faPlus} className="w-6 h-6" />
                        </div>
                        <div className="cursor-pointer p-3" onClick={() => router.push('/notifications')}>
                            <FontAwesomeIcon icon={faBell} className="w-6 h-6" />
                        </div>
                    </div>
                )}
            </div>

            {isDropDownTriggered && (
                <div className="absolute right-5 z-50 bg-gray-800 rounded-lg shadow w-24">
                    <div className="flex flex-col p-2 space-y-2 text-sm text-gray-200">
                        <div onClick={() => alert('Post clicked')} className="cursor-pointer flex justify-between">
                            <span>Post</span>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                        <div onClick={() => alert('Story clicked')} className="cursor-pointer flex justify-between">
                            <span>Story</span>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopNavBar;
