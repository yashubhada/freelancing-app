import React from "react";
import Logo from "../images/logo-dark.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {

    const toggleNav = () => {
        document.querySelector(".nav-items").classList.toggle('top-[81px]');
    }

    return (
        <>
            <nav className="bg-white">
                <div className="px-2 py-2 md:px-0 container mx-auto flex items-center justify-between">
                    <div className="flex items-center justify-center">
                        <NavLink to='/'><img src={Logo} alt="Logo" draggable={false} className="w-16" /></NavLink>
                        <ul className="transition-all absolute right-0 space-y-2 -top-32 md:space-y-0 w-full p-2 bg-[#493932] md:bg-white text-white md:text-[#493932] md:p-0 md:static md:flex items-center justify-center md:ml-10 md:space-x-5 nav-items">
                            <li className="cursor-pointer">How We Grow</li>
                            <li className="cursor-pointer">About Us</li>
                            <li className="cursor-pointer">Healthy Living</li>
                        </ul>
                    </div>
                    <ul className="flex items-center justify-center space-x-5">
                        <li className="flex items-center cursor-pointer"><i className="ri-search-line text-[#493932] text-xl"></i><span className="hidden md:block ml-1 text-sm">Search</span></li>
                        <li className="flex items-center cursor-pointer"><i className="ri-user-line text-[#493932] text-xl"></i><span className="hidden md:block ml-1 text-sm">Login</span></li>
                        <li className="flex items-center cursor-pointer"><i className="ri-shopping-cart-line text-[#493932] text-xl"></i><span className="hidden md:block ml-1 text-sm">Cart</span></li>
                        <li className="md:hidden flex items-center cursor-pointer" onClick={toggleNav}><i className="ri-menu-3-line text-[#493932] text-xl"></i></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar