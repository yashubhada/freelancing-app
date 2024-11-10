import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

const Notification = () => {

    document.title = "Notification | PROFLEX";

    const [jobberId, setJobberId] = useState();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setJobberId(decoded.userId);
        }
    }, []);

    const url = "http://localhost:9171"; // API URL

    const fetchAllNotification = async () => {
        try {
            const response = await axios.post(`${url}/notification/fetchUserNotifications/${jobberId}`);
            setNotifications(response.data.notification);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        if (jobberId) {
            fetchAllNotification();
        }
    }, [jobberId]);

    const [job, setJob] = useState({});
    const [isShowJob, setIsShowJob] = useState(false);
    const handleJob = async (id) => {
        try {
            const response = await axios.post(`${url}/jobPost/fetchOneJob/${id}`);
            if(response.status === 200 && response.data) {
                setJob(response.data);
                setIsShowJob(true);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <Navbar />

            <section className="px-3 md:px-0">
                <div className="container mx-auto mt-5">
                    {
                        notifications.length > 0
                            ?
                            notifications.map((ary, i) => {
                                return (
                                    <div key={i} onClick={() => handleJob(ary.jobId)} className='flex items-center bg-white hover:bg-[#f5f5f5] p-2 border-b cursor-pointer'>
                                        <div className='w-16 h-16 mr-3'>
                                            <img className='w-full h-full object-contain rounded-full border' src={ary.companyImage} alt={ary.companyName} />
                                        </div>
                                        <p className='text-base font-medium text-gray-600'>Your application was viewed for <span className='font-semibold'>{ary.message}</span></p>
                                    </div>
                                )
                            })
                            :
                            <p className='text-center text-sm font-medium text-red-500'>No any notification</p>
                    }
                </div>
            </section>

            {
                isShowJob && job &&
                <section className="px-3 md:px-0 fixed top-0 w-full bg-[#afafaf44] z-20 h-screen flex items-center justify-center">
                    <div className="container relative max-h-full">
                        <div className="relative w-full max-w-xl mx-auto">
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
                                <p className='text-xs text-gray-400 mt-1'>{job.location} · {formatDistanceToNow(new Date(job.datePosted), { addSuffix: true })}</p>
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
                                <h2 className='mt-5 text-lg font-semibold text-gray-800'>About the job</h2>
                                <p className='text-sm text-gray-600 mt-3'>
                                    {job.description}
                                </p>
                            </div>
                            {/* Close Icon */}
                            <div
                                className="absolute -top-2 -right-2 md:-top-3 md:-right-3 cursor-pointer bg-gray-500 rounded-full h-7 w-7 flex items-center justify-center text-white"
                                onClick={() => setIsShowJob(false)}
                            >
                                <i className="ri-close-fill text-xl"></i>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default Notification
