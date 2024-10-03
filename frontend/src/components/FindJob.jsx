import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import JobCard from './JobCard';
import SingleJobCard from './SingleJobCard';
import Footer from './Footer';
import { AppContext } from './context/AppContext';
import axios from 'axios';

const FindJob = () => {

    const { ItSkillsArray } = useContext(AppContext);

    const [jobPosts, setJobPosts] = useState([]);
    const url = "http://localhost:9171"; // API URL
    const fetchAllJobPost = async () => {
        try {
            const reponse = await axios.post(`${url}/jobPost/fetchActiveJobPost`);
            setJobPosts(reponse.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        fetchAllJobPost();
    }, []);

    const [userSkill, setUerSkill] = useState([]);
    const [showSkillSearch, setShowSkillSearch] = useState(true);
    const [toggleShowSelectedJob, setToggleShowSelectedJob] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    useEffect(() => {
        if (jobPosts.length > 0) {
            setSelectedJob(jobPosts[0]);
        }
    }, [jobPosts]);

    const handleChnageSearch = (e) => {
        let word = e.target.value;
        if (word.length !== 0) {
            let filteredData = ItSkillsArray.filter((data) => data.toLocaleLowerCase().includes(word.toLocaleLowerCase()));
            setUerSkill(filteredData);
            setShowSkillSearch(false);
        } else {
            setShowSkillSearch(true);
        }
    };

    const handleJobClick = (job) => {
        setSelectedJob(job); // Update selected job
        setToggleShowSelectedJob(true); // Show selected job in small screen perfectly
    };

    return (
        <>
            <Navbar />

            <section className='px-3 md:px-0'>
                <div className='container mx-auto'>
                    <h1 className='mt-10 font-medium text-lg md:text-3xl text-center text-[#14a800]'>Find the best Job</h1>
                    <p className='mt-5 mb-10 font-medium text-base text-center text-gray-600'>Check out job post with the skills you need for your next job.</p>
                </div>
            </section>

            {/* Searchbar */}
            <section className='px-3 md:px-0'>
                <div className='container mx-auto'>
                    <div className='flex justify-center'>
                        <div className='flex items-center w-full md:w-[500px] border-2 border-gray-300 px-3 py-2 rounded-md relative focus-within:border-gray-500'>
                            <p className='mr-2 text-lg text-[#14a800]'>
                                <i className='ri-search-line'></i>
                            </p>
                            <input
                                type='text'
                                placeholder='Search job skill'
                                className='outline-none w-full'
                                onChange={handleChnageSearch}
                            />
                            <ul className={`absolute top-[47px] left-0 bg-white w-full shadow max-h-[245px] overflow-y-auto ${showSkillSearch && 'hidden'}`}>
                                {userSkill.map((ary, i) => (
                                    <li className='p-3 hover:bg-gray-50 cursor-pointer font-medium' key={i}>
                                        <i className='ri-search-line mr-2'></i>
                                        {ary}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* job post */}
            <section className='px-3 md:px-0'>
                <div className='container mx-auto'>
                    <h1 className='font-semibold text-xl md:text-3xl text-gray-800 mt-14 mb-10 text-center md:text-left'>
                        Your profile matches this job
                    </h1>
                    <div className='grid md:grid-cols-2 gap-2'>
                        {/* Left column for job cards */}
                        <div className='space-y-5 overflow-y-auto max-h-[calc(100vh-4rem)]'>
                            {jobPosts.map((job) => (
                                <JobCard
                                    key={job._id}
                                    job={job}
                                    isSelected={selectedJob && job._id === selectedJob._id}
                                    onClick={() => handleJobClick(job)}
                                />
                            ))}
                        </div>

                        {/* Right column for single job card */}
                        <div className={`${toggleShowSelectedJob ? 'block' : 'hidden'} fixed top-0 right-0 px-3 pt-5 h-screen bg-white overflow-y-hidden md:block md:px-0 md:pt-0 md:static md:overflow-y-auto md:max-h-[calc(100vh-4rem)] custom-scrollbar`}>
                            <p className='md:hidden mb-5 text-2xl h-7 w-7 flex items-center justify-center bg-gray-300 rounded-full' onClick={() => setToggleShowSelectedJob(false)}><i className="ri-arrow-left-s-line"></i></p>
                            {selectedJob && <SingleJobCard job={selectedJob} />}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

        </>
    )
}

export default FindJob
