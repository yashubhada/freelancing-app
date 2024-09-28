import React, { useState } from 'react'
import Navbar from './Navbar'
import JobCard from './JobCard';
import SingleJobCard from './SingleJobCard';

const FindJob = () => {

    const skils = [
        'javascript developer',
        'reactjs',
        'python developer',
        'java developer',
        'HTML',
        'CSS',
        'bootsrap'
    ];

    const jobPosts = [
        {
            "_id": "6489b8706f28d2c4b8b9e782",
            "title": "Backend Developer",
            "description": "Seeking a backend developer with experience in Node.js and MongoDB.",
            "requirements": ["Node.js", "MongoDB", "Express.js", "JavaScript"],
            "location": "New York, NY",
            "employmentType": "Part-Time",
            "salaryRange": "$50,000 - $70,000",
            "postedBy": {
                "employerId": "6489b8706f28d2c4b8b9e457",
                "companyLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdtGo3vo5G5raby3TIK2JGEegEdAYoUMRBag&s",
                "companyName": "Appsforce"
            },
            "datePosted": "2024-09-02",
            "status": "Active",
            "applicants": [
                {
                    "userId": "6489b8706f28d2c4b8b9e124",
                    "status": "Applied"
                }
            ]
        },
        {
            "_id": "6489b8706f28d2c4b8b9e783",
            "title": "Data Scientist",
            "description": "Hiring a data scientist with Python and machine learning experience.",
            "requirements": ["Python", "Machine Learning", "Data Analysis", "SQL"],
            "location": "Remote",
            "employmentType": "Full-Time",
            "salaryRange": "$80,000 - $100,000",
            "postedBy": {
                "employerId": "6489b8706f28d2c4b8b9e458",
                "companyLogo": "https://images.squarespace-cdn.com/content/v1/5eab3148a60be427b8a4a09c/67af43ac-7eca-4ed8-a7f8-cbf8efd5d963/DataSolutions+Climb+Logo+2+Colour+RGB.png?format=1500w",
                "companyName": "Data Solutions"
            },
            "datePosted": "2024-09-03",
            "status": "Active",
            "applicants": [
                {
                    "userId": "6489b8706f28d2c4b8b9e125",
                    "status": "Interview Scheduled"
                }
            ]
        },
        {
            "_id": "6489b8706f28d2c4b8b9e784",
            "title": "UI/UX Designer",
            "description": "Looking for a creative UI/UX designer with Figma experience.",
            "requirements": ["Figma", "Adobe XD", "User Research", "Prototyping"],
            "location": "San Francisco, CA",
            "employmentType": "Contract",
            "salaryRange": "$60,000 - $80,000",
            "postedBy": {
                "employerId": "6489b8706f28d2c4b8b9e459",
                "companyLogo": "https://seeklogo.com/images/R/rounded-design-company-logo-58FEBA6563-seeklogo.com.png",
                "companyName": "Creative Designs"
            },
            "datePosted": "2024-09-04",
            "status": "Active",
            "applicants": [
                {
                    "userId": "6489b8706f28d2c4b8b9e126",
                    "status": "Rejected"
                }
            ]
        },
        {
            "_id": "6489b8706f28d2c4b8b9e785",
            "title": "Full-Stack Developer",
            "description": "We need a full-stack developer skilled in both frontend and backend technologies.",
            "requirements": ["React", "Node.js", "JavaScript", "MongoDB"],
            "location": "Austin, TX",
            "employmentType": "Full-Time",
            "salaryRange": "$90,000 - $110,000",
            "postedBy": {
                "employerId": "6489b8706f28d2c4b8b9e460",
                "companyLogo": "https://media.licdn.com/dms/image/v2/C561BAQGfdzdjV4rIOg/company-background_10000/company-background_10000/0/1611995751406/techinnovators_cover?e=2147483647&v=beta&t=GA7_zMyKhAx-NhwWG-_POyNM44xxosf-qU7q-At3bas",
                "companyName": "Tech Innovators"
            },
            "datePosted": "2024-09-05",
            "status": "Active",
            "applicants": [
                {
                    "userId": "6489b8706f28d2c4b8b9e127",
                    "status": "Hired"
                }
            ]
        },
        {
            "_id": "6489b8706f28d2c4b8b9e786",
            "title": "DevOps Engineer",
            "description": "We are searching for a DevOps engineer with AWS and CI/CD pipeline experience.",
            "requirements": ["AWS", "CI/CD", "Docker", "Kubernetes"],
            "location": "Remote",
            "employmentType": "Full-Time",
            "salaryRange": "$85,000 - $105,000",
            "postedBy": {
                "employerId": "6489b8706f28d2c4b8b9e461",
                "companyLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbZ-S1pdOHsg73DsIPoa_r9_aTLRY1N1kq6g&s",
                "companyName": "Cloud Experts"
            },
            "datePosted": "2024-09-11",
            "status": "Active",
            "applicants": [
                {
                    "userId": "6489b8706f28d2c4b8b9e128",
                    "status": "Under Review"
                }
            ]
        }
    ];



    const [userSkill, setUerSkill] = useState([]);
    const [showSkillSearch, setShowSkillSearch] = useState(true);
    const [toggleShowSelectedJob, setToggleShowSelectedJob] = useState(false);
    const [selectedJob, setSelectedJob] = useState(jobPosts[0]);

    const handleChnageSearch = (e) => {
        let word = e.target.value;
        if (word.length !== 0) {
            let filteredData = skils.filter((data) => data.toLocaleLowerCase().includes(word.toLocaleLowerCase()));
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
                            <ul className={`absolute top-[47px] left-0 bg-white w-full shadow ${showSkillSearch && 'hidden'}`}>
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
                    <div className='grid md:grid-cols-2 gap-5'>
                        {/* Left column for job cards */}
                        <div className='space-y-5 overflow-y-auto max-h-[calc(100vh-4rem)] custom-scrollbar'>
                            {jobPosts.map((job) => (
                                <JobCard key={job._id} job={job} onClick={() => handleJobClick(job)} />
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

        </>
    )
}

export default FindJob
