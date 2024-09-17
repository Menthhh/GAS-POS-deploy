'use client'
import { useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import React, { useEffect } from 'react';



const Layout = ({ children, currentPage, subPage }: { children: React.ReactNode, currentPage: string, subPage: string }) => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(true);

    const toggleNavbar = () => {
        setIsNavbarOpen(prevState => !prevState);
        const table = document.querySelector(".tableShow") as HTMLElement;
        const buttonHeader = document.querySelector(".buttonShow") as HTMLElement;

        if (table) {
            table.style.transition = "margin-right 0.5s ease-in-out, padding-right 0.5s ease-in-out";
        }

        if (buttonHeader) {
            buttonHeader.style.transition = "margin-right 0.5s ease-in-out, padding-right 0.5s ease-in-out";
        }
    }

    useEffect(() => {
        const table = document.querySelector(".tableShow");
        const buttonHeader = document.querySelector(".buttonShow");

        if (table) {

            table.style.marginRight = isNavbarOpen ? "-8rem" : "0"; // Adjust the value as needed
            table.style.paddingRight = isNavbarOpen ? "8rem" : "";
        }

        if (buttonHeader) {
            buttonHeader.style.marginRight = isNavbarOpen ? "-8rem" : "0"; // Adjust the value as needed
            buttonHeader.style.paddingRight = isNavbarOpen ? "8rem" : "";
        }
    }, [isNavbarOpen]);
    return (
        <div className="bg-[#E4E4E4] flex font-ibm-plex-sans-thai h-screen overflow-hidden ">
            <Navbar isOpen={isNavbarOpen} CurrentPage={currentPage} SubPage={subPage} />
            <div className={`flex flex-col w-screen transition-all duration-500 ease-in-out ${isNavbarOpen ? 'ml-0' : '-ml-[16.666%]'}`}>
                <Header onToggleNavbar={toggleNavbar} CurrentPage={currentPage} Subpage={subPage}
                    className="transition-all duration-500 ease-in-out"
                />
                <div
                    className="-mt-2 bg-white h-full z-10 shadow-2xl drop-shadow-lg [box-shadow:_0px_0px_8px_0px_rgb(0_0_0_/_40%)] flex-grow px-4 "
                    style={{
                        background: 'rgb(132, 197, 255) linear-gradient(6deg, rgba(132, 197, 255, 1) 0%, rgba(245, 245, 245, 1) 80%)'
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}


export default Layout;