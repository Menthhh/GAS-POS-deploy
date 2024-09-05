import Link from "next/link";
import { useState } from "react";

interface MenuItem {
    name: string;
    path: string;
}

interface SubNavbarProps {
    menuItems: MenuItem[];
    CurrentPage: string;
}

const SubNavbar = ({ menuItems, CurrentPage }: SubNavbarProps) => {
    const [activeMenu, setActiveMenu] = useState("");


    useState(() => {
        const foundIndex = menuItems.findIndex(item => item.name === CurrentPage);
        if (foundIndex !== -1) {
            setActiveMenu((foundIndex + 1).toString());
        }
    }, [CurrentPage]);

    const handleClick = (menu: string) => {
        setActiveMenu(menu);
    }

    return (
        <div className="h-[48px] bg-white w-full [box-shadow:_0px_1px_4px_0px_rgb(0_0_0_/_40%)] drop-shadow-lg ">
            <div className="flex font-bold text-primary font-ibm-plex-sans-thai items-center h-full ml-11 gap-20 ">
                {menuItems.map((menuItem, index) => (
                    <Link
                        key={index}
                        className={`flex items-center justify-center cursor-pointer p-2 rounded-2xl hover:bg-primary hover:text-white  ${
                            activeMenu === `${index + 1}` ? 'bg-primary text-white' : ''
                        }`}
                        href={menuItem.path}
                        onClick={() => handleClick(`${index + 1}`)}
                    >
                        {menuItem.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SubNavbar;
