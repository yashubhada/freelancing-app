import React from "react";
import HeroImg from "../images/hero-img.png";
import EasyWorkImg from "../images/easyWork-img.png";

const Home = () => {
    return (
        <>
            {/* Hero section */}

            <section className="p-3 md:p-0">
                <div className="container mx-auto py-5 md:py-10">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl md:text-6xl font-medium mb-5">Find & Hire <br />Expert Freelancers</h1>
                            <p className="text-base md:text-lg font-medium text-slate-600 mb-5">Work with the best freelance talent from around the world on our secure, flexible and cost-effective platform.</p>
                            <div className="block md:flex items-center mb-5">
                                <div className="border-2 rounded p-2 border-[#ccc] md:w-[350px] relative">
                                    <input type="text" className="text-[#555] outline-none w-full" placeholder="What skill are you looking for?" autoComplete="off" />
                                    <span><i className="ri-search-line absolute right-0 pr-2 cursor-pointer text-base text-[#14a800]"></i></span>
                                </div>
                                <h1 className="font-medium my-3 text-center md:my-0 md:mx-3">Or</h1>
                                <div className="flex justify-center md:block">
                                    <button className="w-full md:w-fit font-medium text-sm text-white bg-[#108a00] hover:bg-[#14a800] py-3 px-4 rounded">
                                        Post a Job
                                    </button>
                                </div>
                            </div>
                            <div className="flex-wrap space-x-3">
                                <span className="cursor-pointer border rounded p-1 text-sm font-medium text-[#555] hover:text-black border-[#ccc] hover:border-black">Full stack</span>
                                <span className="cursor-pointer border rounded p-1 text-sm font-medium text-[#555] hover:text-black border-[#ccc] hover:border-black">MERN stack</span>
                                <span className="cursor-pointer border rounded p-1 text-sm font-medium text-[#555] hover:text-black border-[#ccc] hover:border-black">Web development</span>
                            </div>
                        </div>
                        <img src={HeroImg} alt="hero-image" className="w-[800px] pl-24 hidden md:block" />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;