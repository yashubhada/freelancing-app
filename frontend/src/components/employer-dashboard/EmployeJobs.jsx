import React, { useEffect, useState } from 'react'
import NavbarEmp from './NavbarEmp'
import JobPostForm from './JobPostForm';
import axios from 'axios';

const EmployeJobs = () => {

    document.title = "Employer dashboard | Jobs";
    const [jobData, setJobData] = useState([]);

    const url = "http://localhost:9171"; // API URL

    const isEmployeSignin = async () => {
        try {
            const response = await axios.get(`${url}/employer/userTokenVerify`, {
                withCredentials: true,
            });
            // console.log('Dashboard Data:', response.data);
            if (response.data.user.userId) {
                const jobs = await axios.post(`${url}/jobPost/fetchEmpJob/${response.data.user.userId}`);
                setJobData(jobs.data);
            }
            if (response.data.user.role !== "Employer") {
                navigate('/signin');
            }
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                // Redirect to login if not authenticated
                navigate('/signin');
            } else {
                console.error('Error fetching dashboard:', error.response?.data || error.message);
            }
        }
    };

    useEffect(() => {
        isEmployeSignin();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // Calculate the total number of pages
    const totalPages = Math.ceil(jobData.length / rowsPerPage);

    // Get the rows for the current page
    const currentRows = jobData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }
    return (
        <>
            <NavbarEmp />

            <section className="px-3 md:px-0 mt-10">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between mb-5">
                        <h1 className='text-lg font-medium'>Existing Jobs</h1>
                        <button
                            className='bg-[#14a800] hover:bg-[#108a00] text-white font-medium text-sm px-4 py-2 rounded-md'
                            onClick={openModal}
                        >
                            Add new job
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-200">
                                        Job Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-200">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-200">
                                        Applicants
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-200">
                                        Date Posted
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-200">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows.map((job, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-200">
                                            {job.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                            {job.status}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                            {job.applicants.length} Applicants
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                            {job.datePosted.split('T')[0]}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border border-gray-200">
                                            <button className="text-blue-600 hover:text-blue-900">Edit</button> |
                                            <button className="text-yellow-500 hover:text-yellow-900">View</button> |
                                            <button className="text-red-600 hover:text-red-900">Deactivate</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
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
                </div>
            </section>


            {/* Add jobs form */}

            {
                isModalOpen &&
                <section className="px-3 md:px-0 fixed top-0 w-full bg-[#afafaf44] z-20 h-screen flex items-center justify-center">
                    <div className="container relative max-h-full">
                        <div className="relative w-full max-w-xl mx-auto">
                            <JobPostForm onClose={closeModal} isEmployeSignin={isEmployeSignin} />

                            {/* Close Icon */}
                            <div
                                className="absolute -top-2 -right-2 md:-top-3 md:-right-3 cursor-pointer bg-gray-500 rounded-full h-7 w-7 flex items-center justify-center text-white"
                                onClick={closeModal}
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

export default EmployeJobs
