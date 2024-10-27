import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Navbar = () => {

    const toggleMenu = () => {
        document.querySelector(".menu-items").classList.toggle("hidden");
    }

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(false);
    const token = Cookies.get("token");
    console.log("Cookie token : ", token);

    const handleLogout = () => {
        if (token) {
            Cookies.remove('token', { path: '/' });
            setIsLogin(false);
            navigate("/signin");
        }
    };

    useEffect(() => {
        if (token) {
            setIsLogin(true);
        }
    }, [isLogin]);

    return (
        <>
            <nav className="p-3 md:px-0 border-b-[1px] border-b-[#CCC]">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center">
                            <h1 className="text-[#555] mr-2 text-3xl md:hidden" onClick={toggleMenu}><i className="ri-menu-line"></i></h1>
                            <NavLink to='/'><h1 className="text-xl md:text-2xl font-semibold text-[#14a800] select-none">PROFLEX</h1></NavLink>
                            <ul className="hidden absolute w-full top-[61px] bg-white z-10 right-0 space-y-5 p-4 md:static md:flex ml-10 text-sm md:space-x-5 md:space-y-0 md:p-0 menu-items">
                                <li className="font-medium menu-link"><NavLink to='/find-job' className="hover:text-[#108a00]" onClick={toggleMenu}>Find Jobs</NavLink></li>
                                <li className="font-medium menu-link"><NavLink to='/profile' className="hover:text-[#108a00]" onClick={toggleMenu}>Profile</NavLink></li>
                                <li className="font-medium menu-link"><NavLink to='/search' className="hover:text-[#108a00]" onClick={toggleMenu}>Search</NavLink></li>
                                <li className="font-medium menu-link"><NavLink to='/notification' className="hover:text-[#108a00]" onClick={toggleMenu}>Notification</NavLink></li>
                                {
                                    isLogin
                                        ?
                                        <li onClick={handleLogout} className="md:hidden font-medium menu-link"><span className="hover:text-[#108a00] cursor-pointer">Logout</span></li>
                                        :
                                        <>
                                            <li className="md:hidden font-medium menu-link"><NavLink to='/signuprole' className="hover:text-[#108a00]">Sign up</NavLink></li>
                                            <li className="md:hidden font-medium menu-link"><NavLink to='/signin' className="hover:text-[#108a00]">Log in</NavLink></li>
                                        </>
                                }
                            </ul>
                        </div>
                        <div className="flex items-center">
                            <button onClick={handleLogout} className="md:mx-10 font-medium text-sm text-white bg-[#108a00] hover:bg-[#14a800] py-2 px-3 rounded">
                                Post a Job
                            </button>
                            <ul className="hidden md:flex text-sm space-x-4">
                                {
                                    isLogin
                                        ?
                                        <li onClick={handleLogout} className="font-medium menu-link"><span className="hover:text-[#108a00] cursor-pointer">Logout</span></li>
                                        :
                                        <>
                                            <li className="font-medium menu-link"><NavLink to='/signuprole' className="hover:text-[#108a00]">Sign up</NavLink></li>
                                            <li className="font-medium menu-link"><NavLink to='/signin' className="hover:text-[#108a00]">Log in</NavLink></li>
                                        </>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar