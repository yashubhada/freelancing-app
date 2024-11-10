import React, { useContext, useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
import { AppContext } from './context/AppContext';
import { jwtDecode } from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SingleJobCard = ({ job }) => {
    const formattedDate = formatDistanceToNow(new Date(job.datePosted), { addSuffix: true });

    const navigate = useNavigate();

    const [userId, setUserId] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const userLoggedIn = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.userId);
            setIsLoggedIn(true);
        }
    }
    useEffect(() => {
        userLoggedIn();
    }, []);

    const { fetchJobberInfo } = useContext(AppContext);
    const [JobberProfileInfo, setJobberProfileInfo] = useState([]);

    const fetchInfo = async () => {
        if (userId) {
            setJobberProfileInfo(await fetchJobberInfo(userId));
        }
    }

    useEffect(() => {
        fetchInfo();
    }, [userId, fetchInfo]);

    const url = "http://localhost:9171"; // API URL
    const [isOpenJobApplyModal, setIsOpenJobApplyModal] = useState(false);
    const [coverLetter, setCoverLetter] = useState(null);

    useEffect(() => {
        if (isOpenJobApplyModal) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "scroll";
        }
    }, [isOpenJobApplyModal]);

    const closeApplyModal = () => {
        setIsOpenJobApplyModal(false);
    }

    const [isApplied, setIsApplied] = useState(false);
    const checkIsApplied = () => {
        if (userId && job?.applicants) {
            const hasApplied = job.applicants.some(applicant => applicant.userId === userId);
            setIsApplied(hasApplied);
        }
    }
    useEffect(() => {
        checkIsApplied();
    }, [userId, job?.applicants]);

    const handleJobPostApply = async (e) => {
        e.preventDefault();
        if (JobberProfileInfo) {
            const isProfileComplete = JobberProfileInfo.name && JobberProfileInfo.profile.resumeUrl && JobberProfileInfo.profile.skills.length > 0 && JobberProfileInfo.profile.experience.length > 0 && JobberProfileInfo.profile.education.length > 0;
            if (!isProfileComplete) {
                toast.error('Please complete your profile before applying for jobs');
            } else {
                setIsOpenJobApplyModal(true);
                try {
                    const response = await axios.post(`${url}/jobPost/applyToJob/${job._id}`,
                        {
                            userId,
                            resumeUrl: JobberProfileInfo.profile.resumeUrl,
                            coverLetter
                        }
                    );
                    job.applicants.push({ userId });
                    setIsApplied(true);
                    toast.success(response.data.msg);
                } catch (error) {
                    console.error(error.message);
                    toast.error(error.response.data.msg);
                } finally {
                    closeApplyModal();
                    checkIsApplied();
                }
            }
        }
    };

    const checkUserIsLoggedIn = () => {
        if (isLoggedIn) {
            setIsOpenJobApplyModal(true);
        } else {
            navigate('/signin');
        }
    }

    return (
        <>
            <Toaster />
            <div className='p-4 border border-gray-200 rounded-lg bg-white mb-5'>
                <div className='flex items-center'>
                    <div className='w-14 mr-3'>
                        <img
                            src={job.postedBy.companyLogo}
                            alt="Company Logo"
                            className='w-full h-full object-contain'
                        />
                    </div>
                    <p className='text-sm font-normal text-gray-700'>{job.postedBy.companyName}</p>
                </div>
                <h2 className='text-lg font-semibold text-gray-800 mt-2'>{job.title}</h2>
                <p className='text-xs text-gray-400 mt-1'>{job.location} · {formattedDate}</p>
                <p className='font-medium text-sm text-gray-600 mt-1'>
                    <span className='text-lg mr-2'><i className="ri-briefcase-4-fill"></i></span>Employment time : {job.employmentType} · Entry level
                </p>
                <p className='font-medium text-sm text-gray-600 mt-1'>
                    <span className='text-lg mr-2'><i className="ri-list-check-3"></i></span>Skills : {job.requirements.join(", ")}
                </p>
                <p className='font-medium text-sm text-gray-600 mt-1'>
                    <span className='text-lg mr-2'><i className="ri-money-rupee-circle-fill"></i></span>
                    Salary Range : ₹{job.salaryRange.min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/(\d+),(\d{2})$/, '$1,$2')} - ₹{job.salaryRange.max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/(\d+),(\d{2})$/, '$1,$2')}
                </p>
                <button
                    className="mt-5 font-medium text-sm text-white bg-[#108a00] hover:bg-[#14a800] py-2 px-3 rounded disabled:opacity-65 disabled:cursor-not-allowed disabled:hover:bg-[#108a00]"
                    onClick={checkUserIsLoggedIn}
                    disabled={isApplied}
                >
                    {
                        isApplied
                            ?
                            "Already applied"
                            :
                            "Apply"
                    }
                </button>
                <h2 className='mt-5 text-lg font-semibold text-gray-800'>About the job</h2>
                <p className='text-sm text-gray-600 mt-3'>
                    {job.description}
                </p>
            </div>

            {/* job application modal */}
            {
                isOpenJobApplyModal &&
                <section className="px-3 md:px-0 fixed top-0 left-0 w-full bg-[#afafaf44] z-20 h-screen flex items-center justify-center">
                    <div className="container relative max-h-full">
                        <div className="relative w-full max-w-xl mx-auto">
                            <form onSubmit={handleJobPostApply} className="p-6 bg-white rounded-lg">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Cover Latter</label>
                                    <textarea
                                        onChange={(e) => setCoverLetter(e.target.value)}
                                        placeholder='(e.g.) I am very excited about this opportunity'
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-indigo-500"
                                        autoComplete="off"
                                        required
                                    />
                                </div>
                                <p className='mb-4 text-sm font-medium text-red-500'><span className='font-bold'>Note :</span> Your profile resume will be automatically submitted when applying for this job.</p>
                                <button
                                    type="submit"
                                    className="flex justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none disabled:opacity-65 "
                                >
                                    submit
                                </button>
                            </form>
                            {/* Close Icon */}
                            <div
                                className="absolute -top-2 -right-2 md:-top-3 md:-right-3 cursor-pointer bg-gray-500 rounded-full h-7 w-7 flex items-center justify-center text-white"
                                onClick={closeApplyModal}
                            >
                                <i className="ri-close-fill text-xl"></i>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    );
}

export default SingleJobCard;
