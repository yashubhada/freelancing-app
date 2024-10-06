import React, { useContext, useEffect, useState } from 'react';
import NavbarEmp from './NavbarEmp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const EmployeApplicants = () => {
    document.title = "Employer dashboard | Applicants";

    const { fetchJobberInfo } = useContext(AppContext);
    const [allApplicants, setAllApplicants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const navigate = useNavigate();
    const url = "http://localhost:9171"; // API URL

    const isEmployeSignin = async () => {
        try {
            const response = await axios.get(`${url}/employer/userTokenVerify`, {
                withCredentials: true,
            });

            if (response.data.user.userId) {
                // Fetch the job data
                const jobsResponse = await axios.post(`${url}/jobPost/fetchEmpJob/${response.data.user.userId}`);
                const jobs = jobsResponse.data;

                // Fetch all applicants profile data asynchronously
                const applicantsWithProfiles = await Promise.all(
                    jobs.flatMap(job =>
                        job.applicants.map(async applicant => {
                            const JobberProfileInfo = await fetchJobberInfo(applicant.userId);
                            // Ensure that the profileInfo exists before returning applicant data
                            if (JobberProfileInfo) {
                                return {
                                    ...applicant,
                                    jobTitle: job.title,
                                    name: JobberProfileInfo.name || "No name",
                                    email: JobberProfileInfo.email || "No Email",
                                    profileImage: JobberProfileInfo.profileImage,
                                    headline: JobberProfileInfo.profile?.headline || "No headline provided",
                                    skills: JobberProfileInfo.profile?.skills || [],
                                    experience: JobberProfileInfo.profile?.experience || [],
                                };
                            }
                        })
                    )
                );

                setAllApplicants(applicantsWithProfiles);
            }

            if (response.data.user.role !== "Employer") {
                navigate('/signin');
            }
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate('/signin');
            } else {
                console.error('Error fetching Job post:', error.response?.data || error.message);
            }
        }
    };

    useEffect(() => {
        isEmployeSignin();
    }, []);

    // Calculate the total number of pages
    const totalPages = Math.ceil(allApplicants.length / rowsPerPage);

    // Get the rows for the current page
    const currentRows = allApplicants.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    console.log(allApplicants);

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <NavbarEmp />
            <section className="px-3 md:px-0 mt-10">
                <div className="container mx-auto">
                    <h1 className='text-lg font-medium mb-5'>Existing Applicants</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-200">
                                        Job Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-200">
                                        user name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-200">
                                        user email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-200">
                                        Applicant Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-200">
                                        Applied On
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-200">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows.map((applicant, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-200">
                                            {applicant.jobTitle}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                            {applicant.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                            {applicant.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                            {applicant.status}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                            {applicant.appliedOn.split('T')[0]}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border text-white border-gray-200 space-x-2">
                                            <button
                                                className="bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages !== 0 ? (
                        <div className="flex justify-center mt-5">
                            <div className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
                                >
                                    <i className="ri-arrow-left-s-line"></i>
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? "bg-indigo-600 px-4 py-1 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
                                >
                                    <i className="ri-arrow-right-s-line"></i>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className='text-sm text-center font-medium mt-5 text-red-500'>No applicants</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default EmployeApplicants;
