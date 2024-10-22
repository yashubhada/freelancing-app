import React, { useEffect, useState } from 'react'
import NavbarEmp from './NavbarEmp'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployerDashboard = () => {

    document.title = "Employer dashboard | Home";
    const navigate = useNavigate();

    const url = "http://localhost:9171"; // API URL

    const [loading, setLoading] = useState(true);

    const [totalEmpJobs, setTotalEmpJobs] = useState(0);
    const [totalJobApplication, setTotalJobApplication] = useState(0);
    const [totalRecentApplications, setTotalRecentApplications] = useState(0);

    const isEmployeSignin = async () => {
        try {
            const response = await axios.get(`${url}/employer/userTokenVerify`, {
                withCredentials: true,
            });
            // console.log('Dashboard Data:', response.data);
            if (response.data.user.role !== "Employer") {
                navigate('/signin');
            } else {
                const jobs = await axios.post(`${url}/jobPost/fetchEmpJob/${response.data.user.userId}`);
                setTotalEmpJobs(jobs.data.length);

                // find totoal application
                const totalApplications = jobs.data.reduce((total, job) => total + job.applicants.length, 0);
                setTotalJobApplication(totalApplications);

                // Calculate the date 24 hours ago
                const last24Hours = new Date();
                last24Hours.setHours(last24Hours.getHours() - 24);

                // Filter applicants applied in the last 24 hours
                let recentApplications = 0;
                jobs.data.forEach(job => {
                    job.applicants.forEach(applicant => {
                        const appliedOnDate = new Date(applicant.appliedOn);
                        if (appliedOnDate >= last24Hours) {
                            recentApplications++;
                        }
                    });
                });
                setTotalRecentApplications(recentApplications)
            }
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                // Redirect to login if not authenticated
                navigate('/signin');
            } else {
                console.error('Error fetching dashboard:', error.response?.data || error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        isEmployeSignin();
    }, []);

    return (
        <>
            <NavbarEmp />
            {
                loading
                    ?
                    <div className='flex items-center justify-center mt-20'>
                        <svg className="animate-spin h-8 w-8 text-[#14a800]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                        </svg>
                    </div>
                    :
                    <section className="px-3 md:px-0 my-10">
                        <div className="container mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-20">
                                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
                                    <h2 className="text-xl font-semibold">Total Job Posts</h2>
                                    <p className="mt-3 text-3xl font-bold">{totalEmpJobs}</p>
                                    <p className="mt-2">Active Listings</p>
                                </div>

                                <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
                                    <h2 className="text-xl font-semibold">Total Applicants</h2>
                                    <p className="mt-3 text-3xl font-bold">{totalJobApplication}</p>
                                    <p className="mt-2">Candidates Applied</p>
                                </div>

                                <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
                                    <h2 className="text-xl font-semibold">New Applications</h2>
                                    <p className="mt-3 text-3xl font-bold">{totalRecentApplications}</p>
                                    <p className="mt-2">In Last 24 Hours</p>
                                </div>
                            </div>
                        </div>
                    </section>
            }

        </>
    )
}

export default EmployerDashboard
