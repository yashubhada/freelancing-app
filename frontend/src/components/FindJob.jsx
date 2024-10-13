import React, { useContext, useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import JobCard from './JobCard';
import SingleJobCard from './SingleJobCard';
import Footer from './Footer';
import { AppContext } from './context/AppContext';
import axios from 'axios';

const FindJob = () => {
    const { ItSkillsArray } = useContext(AppContext);

    const [jobPosts, setJobPosts] = useState([]);
    const [filteredJobPosts, setFilteredJobPosts] = useState([]); // Filtered job posts state
    const [selectedJob, setSelectedJob] = useState(null); // Selected job state

    const url = "http://localhost:9171"; // API URL

    const fetchAllJobPost = async () => {
        try {
            const response = await axios.post(`${url}/jobPost/fetchActiveJobPost`);
            setJobPosts(response.data);
            setFilteredJobPosts(response.data); // Initially show all job posts
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetchAllJobPost();
    }, []);

    const searchBoxRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                setShowSkillSearch(true);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchBoxRef]);

    const [userSkill, setUserSkill] = useState([]);
    const [showSkillSearch, setShowSkillSearch] = useState(true);
    const [toggleShowSelectedJob, setToggleShowSelectedJob] = useState(false);

    const [searchWord, setSearchWord] = useState('');

    const handleSearchChange = (e) => {
        let word = e.target.value;
        setSearchWord(word);
        if (word.length !== 0) {
            let filteredData = ItSkillsArray.filter((data) => data.toLowerCase().includes(word.toLowerCase()));
            setUserSkill(filteredData);
            setShowSkillSearch(false);
        } else {
            setShowSkillSearch(true);
        }
    };

    // Handle selecting a skill from the dropdown
    const handleSkillClick = (skill) => {
        setSearchWord(skill); // Set input value to the selected skill
        setShowSkillSearch(true); // Hide dropdown after selection
        filterJobsBySkill(skill); // Filter jobs by the selected skill
    };

    // Filter job posts based on the selected skill or input value
    const filterJobsBySkill = (skill) => {
        if (!skill) {
            setFilteredJobPosts(jobPosts);
            return;
        }

        // Split the skill input into individual words
        const searchWords = skill.toLowerCase().split(' ');

        const filteredJobs = jobPosts.filter((job) => {
            // Check if any word matches the job title or requirements
            return (
                searchWords.some((word) => job.title.toLowerCase().includes(word)) || // Check against job title
                (Array.isArray(job.requirements) &&
                    job.requirements.some((requirement) =>
                        searchWords.some((word) => requirement.toLowerCase().includes(word))
                    )
                )
            );
        });

        setFilteredJobPosts(filteredJobs);

        // Set the first job in the filtered list as selected
        if (filteredJobs.length > 0) {
            setSelectedJob(filteredJobs[0]);
        }
    };



    useEffect(() => {
        if (jobPosts.length > 0) {
            setSelectedJob(jobPosts[0]);
        }
    }, [jobPosts]);

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
                        <div ref={searchBoxRef} className='flex items-center w-full md:w-[500px] border-2 border-gray-300 px-3 py-2 rounded-md relative focus-within:border-gray-500'>
                            <p className='mr-2 text-lg text-[#14a800]'>
                                <i className='ri-search-line'></i>
                            </p>
                            <input
                                type='text'
                                placeholder='Search job skill'
                                className='outline-none w-full'
                                value={searchWord} // Set input value to searchWord state
                                onChange={handleSearchChange}
                            />
                            <ul className={`absolute top-[47px] left-0 bg-white w-full shadow max-h-[245px] overflow-y-auto ${showSkillSearch && 'hidden'}`}>
                                {userSkill.map((skill, i) => (
                                    <li
                                        className='p-3 hover:bg-gray-50 cursor-pointer font-medium'
                                        key={i}
                                        onClick={() => handleSkillClick(skill)} // Handle skill selection
                                    >
                                        <i className='ri-search-line mr-2'></i>
                                        {skill}
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
                            {
                                filteredJobPosts.length > 0
                                    ? filteredJobPosts.map((job) => (
                                        <JobCard
                                            key={job._id}
                                            job={job}
                                            isSelected={selectedJob && job._id === selectedJob._id}
                                            onClick={() => handleJobClick(job)}
                                        />
                                    ))
                                    : jobPosts.map((job) => (
                                        <JobCard
                                            key={job._id}
                                            job={job}
                                            isSelected={selectedJob && job._id === selectedJob._id}
                                            onClick={() => handleJobClick(job)}
                                        />
                                    ))
                            }
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
    );
}

export default FindJob;
