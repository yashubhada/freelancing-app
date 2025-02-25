import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const NavbarEmp = () => {

    const toggleMenu = () => {
        document.querySelector(".menu-items").classList.toggle("hidden");
    }

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleLogout = () => {
        if (token) {
            localStorage.removeItem('token');
            navigate('/signin');
        }
    };

    return (
        <>
            <nav className="p-3 md:px-0 border-b-[1px] border-b-[#CCC]">
                <div className="container mx-auto">
                    <div className="flex items-center">
                        <h1 className="text-[#555] mr-2 text-3xl md:hidden" onClick={toggleMenu}><i className="ri-menu-line"></i></h1>
                        <NavLink to='/employe-dashboard'><h1 className="text-xl md:text-2xl font-semibold text-[#14a800] select-none">PROFLEX</h1></NavLink>
                        <ul className="hidden absolute w-full top-[61px] bg-white z-10 right-0 space-y-5 p-4 md:static md:flex ml-10 text-sm md:space-x-5 md:space-y-0 md:p-0 menu-items">
                            <li className="font-medium menu-link"><NavLink to='/employe-dashboard' className="hover:text-[#108a00]" onClick={toggleMenu}>Dashboard</NavLink></li>
                            <li className="font-medium menu-link"><NavLink to='/employe-jobs' className="hover:text-[#108a00]" onClick={toggleMenu}>Jobs</NavLink></li>
                            <li className="font-medium menu-link"><NavLink to='/employe-applicants' className="hover:text-[#108a00]" onClick={toggleMenu}>Applicants</NavLink></li>
                            <li className="font-medium menu-link"><NavLink to="/employe-profile" className="hover:text-[#108a00]" onClick={toggleMenu}>Profile</NavLink></li>
                            <li className="font-medium menu-link cursor-pointer hover:text-[#108a00]" onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavbarEmp
