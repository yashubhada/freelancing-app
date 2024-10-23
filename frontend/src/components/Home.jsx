import React, { useContext, useMemo } from "react";
import Navbar from './Navbar';
import Footer from "./Footer";
import HeroImg from "../images/work_from_anywhere.svg";
import EasyWorkImg from "../images/easyWork-img.png";
import GoogleImg from "../images/google.png";
import TcsImg from "../images/tcs.png";
import MicrosoftImg from "../images/microsoft.png";
import SpacexImg from "../images/spacex.png";
import { AppContext } from "./context/AppContext";
import { NavLink } from "react-router-dom";

const MemoizedNavbar = React.memo(Navbar);
const MemoizedFooter = React.memo(Footer);

const Home = () => {
    const { ItSkillsArray } = useContext(AppContext);

    const trustedCompanies = useMemo(() => [
        { name: "Google", img: GoogleImg },
        { name: "TCS", img: TcsImg },
        { name: "Microsoft", img: MicrosoftImg },
        { name: "Spacex", img: SpacexImg }
    ], []);

    const jobSeekerSteps = useMemo(() => [
        { title: 'Search', description: 'Find opportunities that match your skills.', icon: '🔍' },
        { title: 'Apply', description: 'Submit your application to potential employers.', icon: '📝' },
        { title: 'Grow', description: 'Advance your career with the right opportunities.', icon: '📈' },
    ], []);

    const employerSteps = useMemo(() => [
        { title: 'Post', description: 'Share your job openings with candidates.', icon: '📢' },
        { title: 'Shortlist', description: 'Select candidates that fit your requirements.', icon: '✅' },
        { title: 'Hire', description: 'Make the right choice and bring talent on board.', icon: '🤝' },
    ], []);

    const renderTrustedCompanies = useMemo(() => (
        <section className="px-3 md:px-0">
            <div className="container mx-auto mt-5 mb-10 md:mb-20">
                <h1 className="block md:hidden text-lg text-center md:text-left font-medium text-slate-700 mb-3">Trusted by</h1>
                <div className="flex flex-wrap items-center justify-center">
                    <div className="w-1/2 md:w-1/5 mb-5 md:mb-0 hidden md:block">
                        <div className="w-[150px] h-10 mx-auto md:mx-0">
                            <h1 className="text-lg text-center md:text-left font-medium text-slate-700 mb-3">Trusted by</h1>
                        </div>
                    </div>
                    {trustedCompanies.map((company, index) => (
                        <div key={index} className="w-1/2 md:w-1/5 mb-5 md:mb-0">
                            <div className="w-[150px] h-10 mx-auto md:mx-0">
                                <img src={company.img} draggable={false} alt={company.name} className="w-full h-full object-contain" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    ), [trustedCompanies]);

    return (
        <>
            {/* Memoized Navbar */}
            <MemoizedNavbar />

            {/* Hero section */}
            <section className="px-3 md:px-0">
                <div className="container mx-auto py-5 md:py-10">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl md:text-6xl font-semibold mb-5 text-balance">Find Jobs<br />Build Your Career</h1>
                            <p className="text-base text-balance md:text-xl font-medium text-slate-800 mb-5">Connect with Top Talent and Career Opportunities.</p>
                            <p className="text-sm text-balance md:text-base font-medium text-slate-600 mb-5">Work with the best job talent from around the world on our secure, flexible and cost-effective platform.</p>
                            <div className="flex-wrap space-x-3">
                                <span className="cursor-pointer border rounded p-1 text-sm font-medium text-[#555] hover:text-black border-[#ccc] hover:border-black">Full stack</span>
                                <span className="cursor-pointer border rounded p-1 text-sm font-medium text-[#555] hover:text-black border-[#ccc] hover:border-black">MERN stack</span>
                                <span className="cursor-pointer border rounded p-1 text-sm font-medium text-[#555] hover:text-black border-[#ccc] hover:border-black">Web design</span>
                            </div>
                        </div>
                        <img src={HeroImg} draggable={false} alt="hero-image" className="w-[700px] hidden md:block" />
                    </div>
                </div>
            </section>

            {/* Memoized Trusted by section */}
            {renderTrustedCompanies}

            {/* Work section */}
            <section className="px-3 md:px-0">
                <div className="container mx-auto mb-10">
                    <div className="block md:flex items-center">
                        <div className="bg-[#f2f7f2] w-full md:w-1/3 rounded-lg py-10 mb-5 md:mb-0">
                            <img src={EasyWorkImg} draggable={false} alt="EasyWorkImg" className="w-[250px] md:w-[300px] mx-auto" />
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
                            <NavLink to='/signuprole'>
                                <button className="w-full md:w-fit font-medium text-sm text-white bg-[#108a00] hover:bg-[#14a800] py-2 px-3 rounded">
                                    Sign up for free
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10 bg-gradient-to-r from-gray-100 via-white to-gray-100">
                <div className="container mx-auto px-4">
                    {/* Heading */}
                    <h1 className="text-xl md:text-3xl font-semibold text-center text-gray-900 mb-8">
                        Key Features
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Job Seekers Section */}
                        <div className="p-6 bg-white shadow-md rounded-lg">
                            <i className="ri-user-line text-5xl text-[#108a00]"></i>
                            <h2 className="text-lg md:text-2xl font-semibold mb-4 text-gray-900 mt-4">
                                For Job Seekers
                            </h2>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-center">
                                    <i className="ri-profile-line mr-2 text-[#108a00]"></i>
                                    <span className="text-sm md:text-base font-medium">Create your profile and showcase your skills</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="ri-send-plane-line mr-2 text-[#108a00]"></i>
                                    <span className="text-sm md:text-base font-medium">Apply to jobs with a single click</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="ri-team-line mr-2 text-[#108a00]"></i>
                                    <span className="text-sm md:text-base font-medium">Connect with top employers in your industry</span>
                                </li>
                            </ul>
                        </div>

                        {/* Job Providers Section */}
                        <div className="p-6 bg-white shadow-md rounded-lg">
                            <i className="ri-briefcase-line text-5xl text-[#108a00]"></i>
                            <h2 className="text-lg md:text-2xl font-semibold mb-4 text-gray-900 mt-4">
                                For Job Providers
                            </h2>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-center">
                                    <i className="ri-user-search-line mr-2 text-[#108a00]"></i>
                                    <span className="text-sm md:text-base font-medium">Find and hire the best talent</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="ri-file-list-line mr-2 text-[#108a00]"></i>
                                    <span className="text-sm md:text-base font-medium">Post job listings and manage applications easily</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="ri-database-2-line mr-2 text-[#108a00]"></i>
                                    <span className="text-sm md:text-base font-medium">Search our talent database to hire quickly</span>
                                </li>
                            </ul>
                        </div>

                        {/* Common Benefits */}
                        <div className="p-6 bg-white shadow-md rounded-lg">
                            <i className="ri-star-line text-5xl text-[#108a00]"></i>
                            <h2 className="text-lg md:text-2xl font-semibold mb-4 text-gray-900 mt-4">
                                Why Choose Us
                            </h2>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-center">
                                    <i className="ri-shield-star-line mr-2 text-[#108a00]"></i>
                                    <span className="text-sm md:text-base font-medium">Reliable and secure platform</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="ri-wallet-3-line mr-2 text-[#108a00]"></i>
                                    <span className="text-sm md:text-base font-medium">Cost-effective for both seekers and providers</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="ri-global-line mr-2 text-[#108a00]"></i>
                                    <span className="text-sm md:text-base font-medium">Global reach with local expertise</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10 bg-gradient-to-r from-gray-100 via-white to-gray-100">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-center">How It Works</h1>
                    <p className="text-center mt-4">
                        A simple and seamless process to connect talent with opportunities.
                    </p>
                    <div className="flex flex-col md:flex-row justify-around mt-10">
                        {/* Job Seekers Section */}
                        <div className="mb-6 md:mb-0">
                            <h2 className="text-xl font-semibold text-center">For Job Seekers</h2>
                            <ul className="mt-4">
                                {jobSeekerSteps.map((step, index) => (
                                    <li key={index} className="flex items-center mt-4">
                                        <span className="w-10 h-10 flex items-center justify-center border text-white rounded-full">
                                            {step.icon}
                                        </span>
                                        <div className="ml-4">
                                            <h3 className="font-semibold">{step.title}</h3>
                                            <p>{step.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Employers Section */}
                        <div>
                            <h2 className="text-xl font-semibold text-center">For Employers</h2>
                            <ul className="mt-4">
                                {employerSteps.map((step, index) => (
                                    <li key={index} className="flex items-center mt-4">
                                        <span className="w-10 h-10 flex items-center justify-center border text-white rounded-full">
                                            {step.icon}
                                        </span>
                                        <div className="ml-4">
                                            <h3 className="font-semibold">{step.title}</h3>
                                            <p>{step.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Memoized Footer */}
            <MemoizedFooter />
        </>
    );
};

export default Home;
