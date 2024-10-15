import React, { useContext, useEffect, useState } from 'react';
import NavbarEmp from './NavbarEmp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import ViewSingleApplicantModal from './ViewSingleApplicantModal';
import Conversation from '../Conversation';

const EmployeApplicants = () => {
    document.title = "Employer dashboard | Applicants";

    const { fetchJobberInfo } = useContext(AppContext);
    const [allApplicants, setAllApplicants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const [empInfo, setEmpInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const url = "http://localhost:9171"; // API URL

    const isEmployeSignin = async () => {
        try {
            const response = await axios.get(`${url}/employer/userTokenVerify`, {
                withCredentials: true,
            });

            if (response.data.user.userId) {
                // Fetch the job data
                setEmpInfo(response.data.user);
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
                                    jobId: job._id,
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
        } finally {
            setLoading(false);
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

    const [viewApplicant, setViewApplicant] = useState({});
    const [isOpenViewApplicantModal, setIsOpenViewApplicantModal] = useState(false);

    const sendNotification = async (applicant) => {
        try {
            await axios.post(`${url}/notification`, {
                userId: applicant.userId,
                jobId: applicant.jobId,
                message: applicant.jobTitle
            });
        } catch (error) {
            console.error(error.message);
        }
    }

    const viewSingleApplicant = async (id) => {
        const selectedApplicant = allApplicants.find((ary) => ary._id === id);
        if (selectedApplicant) {
            setViewApplicant(selectedApplicant);
            setIsOpenViewApplicantModal(true);

            // Call sendNotification with the selected applicant directly
            await sendNotification(selectedApplicant);
        }
    };



    const closeModal = () => {
        setIsOpenViewApplicantModal(false);
    }

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    // message -- conversation

    const [isOpenFirstConversation, setIsOpenFirstConversation] = useState(false);
    const [msgApplication, setMsgApplication] = useState(null);

    const openMessageBox = (applicants) => {
        setIsOpenFirstConversation(true);
        if (applicants) {
            setMsgApplication(applicants);
        }
    }
    const [message, setMessage] = useState('');
    const sendFirstMsg = async (e) => {
        e.preventDefault();
        if (msgApplication) {
            try {
                await axios.post(`${url}/conversation/newConversation`, {
                    user1id: empInfo.userId,
                    user1name: empInfo.name,
                    user1ProfileImage: empInfo.profileImage,
                    user2id: msgApplication.userId,
                    user2name: msgApplication.name,
                    user2ProfileImage: msgApplication.profileImage,
                    senderId: empInfo.userId,
                    message
                });
            } catch (err) {
                console.error(err);
            } finally {
                setIsOpenFirstConversation(false);
            }
        }
    }

    return (
        <>
            {
                loading
                    ?
                    <div className="text-center py-10">
                        < p > Loading...</ p>
                    </div >
                    :
                    <>
                        <NavbarEmp />
                        <section className="px-3 md:px-0 mt-10">
                            {/* Pagination Controls */}
                            {totalPages !== 0 ?
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
                                                            {applicant.appliedOn.split('T')[0]}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border text-white border-gray-200 space-x-2">
                                                            <button
                                                                className="bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
                                                                onClick={() => viewSingleApplicant(applicant._id)}
                                                            >
                                                                View
                                                            </button>
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
                                </div>
                                :
                                <p className='text-sm text-center font-medium mt-5 text-red-500'>No applicants</p>
                            }
                        </section>

                        {/* View single applicants */}
                        {
                            isOpenViewApplicantModal &&
                            <section className="px-3 md:px-0 fixed top-0 w-full bg-[#afafaf44] z-20 h-screen flex items-center justify-center">
                                <div className="container relative max-h-full">
                                    <div className="relative w-full max-w-xl mx-auto">
                                        <ViewSingleApplicantModal applicants={viewApplicant} openMessageBox={openMessageBox} />

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

                        {/* first message --- create  new conversation */}
                        {
                            isOpenFirstConversation &&
                            <section className="px-3 md:px-0 fixed top-0 w-full bg-[#afafaf44] z-20 h-screen flex pt-10 justify-center">
                                <div className="container relative max-h-full">
                                    <div className="relative w-full max-w-xl mx-auto">
                                        <div className='bg-white rounded-md'>
                                            <h1 className='text-xl font-semibold text-gray-700 p-4'>Start new conversation</h1>
                                            <form onSubmit={sendFirstMsg}>
                                                <div className='border-t border-b p-4'>
                                                    <label className='text-base font-medium text-gray-700 block'>Enter new conversation message</label>
                                                    <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" className='outline-none border border-gray-500 rounded px-3 py-2 w-full mt-3 focus:border-indigo-500' required />
                                                </div>
                                                <div className='flex items-center justify-end p-4 space-x-4'>
                                                    <button type='submit' className='bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded font-medium text-base'>send</button>
                                                    <button type='button' onClick={() => setIsOpenFirstConversation(false)} className='bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded font-medium text-base'>cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        }

                        <Conversation participantId={empInfo.userId} loggedInUser={empInfo} />
                    </>
            }
        </>
    );
};

export default EmployeApplicants;
