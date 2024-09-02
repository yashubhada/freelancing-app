import React from "react";
import HeroImg from "../images/hero-img.png";
import EasyWorkImg from "../images/easyWork-img.png";
import GoogleImg from "../images/google.png";
import TcsImg from "../images/tcs.png";
import MicrosoftImg from "../images/microsoft.png";
import SpacexImg from "../images/spacex.png";

const Home = () => {
    return (
        <>
            {/* Hero section */}

            <section className="px-3 md:px-0">
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
                                    <button className="w-full md:w-fit font-medium text-sm text-white bg-[#108a00] active:bg-[#14a800] py-3 px-4 rounded">
                                        Post a Job
                                    </button>
                                </div>
                            </div>
                            <div className="flex-wrap space-x-3">
                                <span className="cursor-pointer border rounded p-1 text-sm font-medium text-[#555] hover:text-black border-[#ccc] hover:border-black">Full stack</span>
                                <span className="cursor-pointer border rounded p-1 text-sm font-medium text-[#555] hover:text-black border-[#ccc] hover:border-black">MERN stack</span>
                                <span className="cursor-pointer border rounded p-1 text-sm font-medium text-[#555] hover:text-black border-[#ccc] hover:border-black">Web design</span>
                            </div>
                        </div>
                        <img src={HeroImg} alt="hero-image" className="w-[800px] pl-24 hidden md:block" />
                    </div>
                </div>
            </section>


            {/* Trusted by */}

            <section className="px-3 md:px-0">
                <div className="container mx-auto mt-5 mb-10 md:mb-20">
                    <h1 className="text-lg text-center md:text-left font-medium text-slate-700 mb-3">Trusted by</h1>
                    <div className="flex flex-wrap items-center justify-center">
                        <div className="w-1/2 md:w-1/4 mb-5 md:mb-0">
                            <div className="w-[150px] h-10 mx-auto md:mx-0">
                                <img src={GoogleImg} alt="Google" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div className="w-1/2 md:w-1/4 mb-5 md:mb-0">
                            <div className="w-[150px] h-10 mx-auto md:mx-0">
                                <img src={TcsImg} alt="TCS" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div className="w-1/2 md:w-1/4">
                            <div className="w-[150px] h-10 mx-auto md:mx-0">
                                <img src={MicrosoftImg} alt="Microsoft" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div className="w-1/2 md:w-1/4">
                            <div className="w-[150px] h-10 mx-auto md:mx-0">
                                <img src={SpacexImg} alt="Spacex" className="w-full h-full object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Work */}

            <section className="px-3 md:px-0">
                <div className="container mx-auto mb-5">
                    <div className="block md:flex items-center">
                        <div className="bg-[#f2f7f2] w-full md:w-1/3 rounded-lg py-10 mb-5 md:mb-0">
                            <img src={EasyWorkImg} alt="EasyWorkImg" className="w-[250px] md:w-[300px] mx-auto" />
                        </div>
                        <div className="md:pl-5">
                            <h1 className="text-2xl md:text-4xl text-slate-800 font-medium mb-4">Up your work game, it’s easy</h1>
                            <div className="flex items-start mb-5">
                                <i className="ri-edit-box-line text-slate-800 text-xl mr-3"></i>
                                <div>
                                    <h1 className="text-lg md:text-xl font-medium text-slate-700">No cost to join</h1>
                                    <p className="text-sm font-medium text-slate-600">Register and browse talent profiles, explore projects, or even book a consultation.</p>
                                </div>
                            </div>
                            <div className="flex items-start mb-5">
                                <i className="ri-pushpin-line text-slate-800 text-xl mr-3"></i>
                                <div>
                                    <h1 className="text-lg md:text-xl font-medium text-slate-700">Post a job and hire top talent</h1>
                                    <p className="text-sm font-medium text-slate-600">Finding talent doesn’t have to be a chore. Post a job or we can search for you!</p>
                                </div>
                            </div>
                            <div className="flex items-start mb-5">
                                <i className="ri-shield-star-line text-slate-800 text-xl mr-3"></i>
                                <div>
                                    <h1 className="text-lg md:text-xl font-medium text-slate-700">Work with the best—without breaking the bank</h1>
                                    <p className="text-sm font-medium text-slate-600">Upwork makes it affordable to up your work and take advantage of low transaction rates.</p>
                                </div>
                            </div>
                            <button className="w-full md:w-fit font-medium text-sm text-white bg-[#108a00] active:bg-[#14a800] py-2 px-3 rounded">
                                Sign up for free
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Home;