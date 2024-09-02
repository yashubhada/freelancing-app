import React from "react";

const Navbar = () => {

    const toggleMenu = () => {
        document.querySelector(".menu-items").classList.toggle("hidden");
    }

    return (
        <>
            <nav className="p-3 md:px-0 border-b-[1px] border-b-[#CCC]">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center">
                            <h1 className="text-[#555] mr-2 text-3xl md:hidden" onClick={toggleMenu}><i className="ri-menu-line"></i></h1>
                            <h1 className="text-xl md:text-2xl font-semibold text-[#14a800] select-none">PROFLEX</h1>
                            <ul className="hidden absolute w-full top-[61px] bg-white right-0 space-y-5 p-4 md:static md:flex ml-10 text-sm md:space-x-5 md:space-y-0 md:p-0 menu-items">
                                <li className="font-medium"><a href="#" className="hover:text-[#108a00]">Find Freelancers</a></li>
                                <li className="font-medium"><a href="#" className="hover:text-[#108a00]">Find Jobs</a></li>
                                <li className="font-medium"><a href="#" className="hover:text-[#108a00]">About</a></li>
                                <li className="md:hidden font-medium"><a href="#" className="hover:text-[#108a00]">Sign up</a></li>
                                <li className="md:hidden font-medium"><a href="#" className="hover:text-[#108a00]">Log in</a></li>
                            </ul>
                        </div>
                        <div className="flex items-center">
                            <button className="font-medium text-sm text-white bg-[#108a00] hover:bg-[#14a800] py-2 px-3 rounded">
                                Post a Job
                            </button>
                            <ul className="hidden md:flex ml-10 text-sm space-x-4">
                                <li className="font-medium"><a href="#" className="hover:text-[#108a00]">Sign up</a></li>
                                <li className="font-medium"><a href="#" className="hover:text-[#108a00]">Log in</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar