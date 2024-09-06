// BottomNavBar.tsx

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCompass, faFilm, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'; // Import icons

const BottomNavBar = () => {
  const router = useRouter();
  const [activeNavBar, setActiveNavBar] = useState<string | undefined>(undefined);

  const menuItems = [
    {
      title: 'Home',
      path: '/home',
      icon: faHome,
    },
    {
      title: 'Explore',
      path: '/explore',
      icon: faCompass,
    },
    {
      title: 'Reels',
      path: '/reels',
      icon: faFilm,
    },
    {
      title: 'Direct',
      path: '/direct',
      icon: faEnvelope,
    },
    {
      title: 'Profile',
      path: '/profile',
      icon: faUser,
      img: 'https://avatars.githubusercontent.com/u/83784102?v=4', // Example avatar
    },
  ];

  useEffect(() => {
    setActiveNavBar(router.pathname);
  }, [router.pathname]);

  const updateActiveNavBar = (navBarTab: string) => {
    setActiveNavBar(navBarTab);
  };

  return (
    <div className="flex flex-col space-x-2 justify-around border-t border-gray-700 sticky bottom-0 md:hidden z-50 bg-black">
      <div className="flex space-x-2 justify-around">
        {menuItems.map((item, index) => (
          <Link href={item.path} key={index} passHref>
            <div
              onClick={() => updateActiveNavBar(item.path)}
              className={`group cursor-pointer rounded-full flex space-x-4 sm:hover:bg-slate-1000 p-3 ${
                item.path === activeNavBar ? 'bg-slate-1000 animate-pulse' : ''
              } justify-center`}
            >
              {item.img ? (
                <img
                  className="w-6 h-6 rounded-full shadow-lg group-hover:scale-110"
                  src={item.img}
                  alt={item.title}
                />
              ) : (
                <FontAwesomeIcon
                  icon={item.icon}
                  className="group-hover:scale-110 transition-transform"
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavBar;
