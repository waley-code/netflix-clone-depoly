import { useCallback, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";

import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs'
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;;

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            }else{
                setShowBackground(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const toggleMenue = useCallback(()=>{
        setShowMobileMenu((current) => !current)
    }, []);
    const toggleAccountMenue = useCallback(()=>{
        setShowAccountMenu((current) => !current)
    }, []);
    return (
        <nav className="text-white w-full fixed z-40">
            <div 
            className={`
            px-4
            py-6
            md:px-16
            flex
            flex-row
            items-center
            transition
            duration-500
            
            ${showBackground ? 'bg-zinc-900 bg-opacity-90' : '' }
            `}
            >
                <img 
                className="h-4
                lg:h-7
                "
                src="/images/logo.png" alt="logo" />
                <div
                className="
                flex-row
                ml-8
                gap-7
                hidden
                lg:flex
                "
                >
                    <NavbarItem label="Home" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                    <NavbarItem label="Browse by languages" />
                </div>
                <div onClick={toggleMenue} className="lg:hidden flex flex-row  gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white tect-sam">Browse</p>
                    <BsChevronDown className={`text-white mt-1 transition ${showMobileMenu ? 'rotate-180': 'rotate-0'}`} />
                    <MobileMenu visible={showMobileMenu}  />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-300 hover:text-gray-400 cursor-pointer transition">
                        <BsSearch />
                    </div>
                    <div className="text-gray-300 hover:text-gray-400 cursor-pointer transition">
                        <BsBell />
                    </div>
                    <div onClick={toggleAccountMenue} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-red.png" alt="" />
                        </div>
                        <BsChevronDown className={`text-white mt-1 transition ${showAccountMenu ? 'rotate-180': 'rotate-0'}`} />
                        <AccountMenu visble={showAccountMenu}/>
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;