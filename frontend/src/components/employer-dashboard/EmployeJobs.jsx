import React, { useContext, useEffect, useState } from 'react'
import NavbarEmp from './NavbarEmp'
import JobPostForm from './JobPostForm';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ViewSingleJobModal from './ViewSingleJobModal';
import { AppContext } from '../context/AppContext';

const EmployeJobs = () => {

    document.title = "Employer dashboard | Jobs";

    const [loading, setLoading] = useState(true);

    const { fetchEmployerInfo } = useContext(AppContext);
    const [EmployerProfileInfo, setEmployerProfileInfo] = useState({});

    const [jobData, setJobData] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState(jobData);

    const navigate = useNavigate();

    const url = "http://localhost:9171"; // API URL

    const isEmployeSignin = async () => {
        try {
            const response = await axios.get(`${url}/employer/userTokenVerify`, {
                withCredentials: true,
            });
            // console.log('Dashboard Data:', response.data);
            if (response.data.user.userId) {
                const jobs = await axios.post(`${url}/jobPost/fetchEmpJob/${response.data.user.userId}`);
                // job sorted by on it's datePosted
                setJobData(jobs.data.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted)));
                const emp = await fetchEmployerInfo(response.data.user.userId);
                if (emp) {
                    setEmployerProfileInfo(emp);
                }
            }
            if (response.data.user.role !== "Employer") {
                navigate('/signin');
            }
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                // Redirect to login if not authenticated
                navigate('/signin');
            } else {
                console.error('Error fetching Job post:', error.response?.data || error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        isEmployeSignin();
    }, []);

    useEffect(() => {
        setFilteredJobs(jobData);
    }, [jobData]);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredJobs.length / rowsPerPage);

    // Get the rows for the current page
    const currentRows = filteredJobs.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // find job post
    const findJobPostChange = (word) => {
        if (word.length > 0) {
            const filtered = jobData.filter((job) =>
                job.title.toLowerCase().includes(word.toLowerCase())
            );
            setFilteredJobs(filtered);
        } else {
            setFilteredJobs(jobData);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        const { bio, companyLogoImg, companyName, industry, location, website } = EmployerProfileInfo.profile;
        if (!bio || !companyLogoImg || !companyName || !industry || !location || !website) {
            return toast.error('Please fill your company information');
        }
        setIsModalOpen(true);
    }

    const deleteJobPost = async (id) => {
        try {
            const response = await axios.post(`${url}/jobPost/deleteJobPost/${id}`);
            toast.success(response.data.msg);
            isEmployeSignin();
        } catch (error) {
            console.error(error.message);
        }
    }

    const changeJobPostStatus = async (id, jobStatus) => {
        let newStatus = "Active";
        if (jobStatus === "Active") {
            newStatus = "Deactivate";
        }
        try {
            const response = await axios.put(`${url}/jobPost/changeJobPostStatus/${id}`, {
                status: newStatus,
            });
            toast.success(response.data.msg);
            isEmployeSignin();
        } catch (error) {
            console.error(error.message);
        }
    }

    const [viewJob, setViewJob] = useState([]);
    const [isOpenViewJobModal, setIsOpenViewJobModal] = useState(false);
    const viewSingleJobPost = (id) => {
        let newAry = jobData.filter((ary) => ary._id === id);
        setViewJob(newAry[0]);
        setIsOpenViewJobModal(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setIsOpenViewJobModal(false);
    }

    return (
        <>
            <Toaster />
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
                            <div className="flex items-center justify-center mb-5">
                                <div className='w-full md:w-96 bg-white border focus-within:border-[#14a800] rounded px-3 py-2 flex items-center'>
                                    <i className='ri-search-line text-lg text-[#14a800] mr-2'></i>
                                    <input onChange={(e) => findJobPostChange(e.target.value)} type="text" className='outline-none border-0 w-full' placeholder='Find job post...' />
                                </div>
                            </div>
                            {/* Pagination Controls */}
                            {
                                filteredJobs.length !== 0
                                    ?
                                    <>
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
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border text-white border-gray-200 space-x-2">
                                                                <button
                                                                    className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600"
                                                                    onClick={() => viewSingleJobPost(job._id)}
                                                                >
                                                                    View
                                                                </button>
                                                                <button
                                                                    className="bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
                                                                    onClick={() => changeJobPostStatus(job._id, job.status)}
                                                                >
                                                                    {
                                                                        job.status === "Active" ? "Deactivate" : "Active"
                                                                    }
                                                                </button>
                                                                <button className="bg-red-600 px-2 py-1 rounded hover:bg-red-700" onClick={() => deleteJobPost(job._id)}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
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
                                    </>
                                    :
                                    <p className='text-sm text-center font-medium mt-5 text-red-500'>No jobs</p>
                            }

                        </div>
                    </section>
            }


            {/* View single job post */}
            {
                isOpenViewJobModal &&
                <section className="px-3 md:px-0 fixed top-0 w-full bg-[#afafaf44] z-20 h-screen flex items-center justify-center">
                    <div className="container relative max-h-full">
                        <div className="relative w-full max-w-xl mx-auto">
                            <ViewSingleJobModal job={viewJob} />

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
