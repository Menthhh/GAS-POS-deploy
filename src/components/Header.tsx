import React from 'react';
import Image from 'next/image';
import menu from '../../public/images/menu.png';
import profile from '../../public/images/profile.png';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import right from '../../public/images/right.png';
import Link from 'next/link';

interface HeaderProps {
    onToggleNavbar: () => void;
    CurrentPage: string;
    Subpage: string;
    className?: string;
}

const Header = ({ onToggleNavbar, CurrentPage, Subpage, className }: HeaderProps) => {

    return (
        <header
            className={`${className} z-50 bg-white h-20 rounded-b-[13px] drop-shadow-lg [box-shadow:_0px_4px_0_rgb(0_0_0_/_5%)] flex justify-between items-center`}
        >
            <div className="flex items-center justify-start -translate-x-3">
                <Image src={menu} alt="Menu" className="object-cover cursor-pointer ml-5" width={65} height={65} onClick={onToggleNavbar} />
                <div className="h-16 bg-white w-full rounded-[20px] text-secondary font-ibm-plex-sans-thai flex items-center justify-start pl-5 ">
                    <p>{CurrentPage} </p>
                    <div className="text-primary font-bold font-xl flex  font-ibm-plex-sans-thai gap-2 items-center pl-2 "><Image src={right} alt="logo" className="size-4" /> {Subpage}</div>
                </div>
            </div>
            <div className="flex justify-between items-center gap-8">
                <button className="ring-1 ring-[#C6C6C6] py-2 px-3 text-primary flex justify-between items-center gap-2 rounded-lg hover:bg-gray-100">
                    <AutorenewIcon />
                    Refresh
                </button>

                <Link href="/pages/setting">
                    <Image src="/images/settings.png" alt="Settings" className="object-cover cursor-pointer" width={30} height={30} />
                </Link>  
                <Link href="/login">
                    <Image src="/images/notification.png" alt="Settings" className="object-cover cursor-pointer" width={30} height={30} />
                </Link>  

                <div className="flex items-center">
                <div>
                    <h1 className="text-start font-bold">Tonkla Pokaew</h1>
                    <p className="text-sm text-[#878787] text-end">Admin</p>
                </div>
                <Image src={profile} alt="Profile" className="p-5 object-cover cursor-pointer w-24 h-24" />
                </div>
            </div>
        </header>
    );
}

export default Header;
