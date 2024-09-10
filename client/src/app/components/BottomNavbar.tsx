// BottomNavBar.tsx (Next.js)
"use client"
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCompass, faVideo, faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons';

const BottomNavBar = () => {
    const [activeNavBar, setActiveNavBar] = useState<string>('');
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setActiveNavBar(pathname);
    }, [pathname]);

    const updateActiveNavBar = (path: string) => {
        setActiveNavBar(path);
        router.push(path);
    };

    const menuItems = [
        { title: 'home', path: '/home', icon: faHome },
        { title: 'explore', path: '/explore', icon: faCompass },
        { title: 'reels', path: '/reels', icon: faVideo },
        { title: 'direct', path: '/direct', icon: faPaperPlane },
        { title: 'profile', path: '/profile', icon: faUser }
    ];

    return (
        <div className="flex flex-col justify-around sticky bottom-0 z-50 bg-black">
            <div className="flex justify-around">
                {menuItems.map((item) => (
                    <div
                        key={item.title}
                        onClick={() => updateActiveNavBar(item.path)}
                        className={`cursor-pointer p-3 ${item.path === activeNavBar ? 'bg-slate-1000' : ''}`}
                    >
                        <FontAwesomeIcon icon={item.icon} className="w-6 h-6" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BottomNavBar;
