import React, { useContext, useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
import { AppContext } from './context/AppContext';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';

const SingleJobCard = ({ job }) => {
    // Convert job.datePosted to a readable "time ago" format
    const formattedDate = formatDistanceToNow(new Date(job.datePosted), { addSuffix: true });

    const [userId, setUserId] = useState();
    useEffect(() => {
        const cookieToken = Cookies.get('token');
        if (cookieToken) {
            const decoded = jwtDecode(cookieToken);
            setUserId(decoded.userId);
        }
    }, []);

    const { JobberProfileInfo, fetchJobberInfo } = useContext(AppContext);
    useEffect(() => {
        if (userId) {
            fetchJobberInfo(userId);
        }
    }, [userId, fetchJobberInfo]);

    const handleJobPostApply = () => {
        if (JobberProfileInfo) {
            const isProfileComplete = JobberProfileInfo.name && JobberProfileInfo.profile.resumeUrl && JobberProfileInfo.profile.skills.length > 0 && JobberProfileInfo.profile.experience.length > 0 && JobberProfileInfo.profile.education.length > 0;
            if (!isProfileComplete) {
                toast.error('Please complete your profile before applying for jobs');
            } else { 
                toast.success('successfully applying for jobs');
            }
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
                    className="mt-5 font-medium text-sm text-white bg-[#108a00] hover:bg-[#14a800] py-2 w-[80px] rounded"
                    onClick={handleJobPostApply}
                >
                    Apply
                </button>
                <h2 className='mt-5 text-lg font-semibold text-gray-800'>About the job</h2>
                <p className='text-sm text-gray-600 mt-3'>
                    {job.description}
                </p>
            </div>
        </>
    );
}

export default SingleJobCard;
