import React, { useContext, useEffect, useRef, useState } from 'react';
import NavbarEmp from './NavbarEmp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import ViewSingleApplicantModal from './ViewSingleApplicantModal';

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

    const [viewApplicant, setViewApplicant] = useState([]);
    const [isOpenViewApplicantModal, setIsOpenViewApplicantModal] = useState(false);
    const viewSingleApplicant = (id) => {
        let newAry = allApplicants.filter((ary) => ary._id === id);
        setViewApplicant(newAry[0]);
        setIsOpenViewApplicantModal(true);
    }

    const closeModal = () => {
        setIsOpenViewApplicantModal(false);
    }

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    // message -- conversation

    const messages = [
        { id: 1, text: 'Hello! How are you?', sender: 'me' },
        { id: 2, text: 'I’m good, thank you! How about you?', sender: 'other' },
        { id: 3, text: 'I’m great, thanks for asking!', sender: 'me' },
        { id: 4, text: 'I’m great, thanks for asking! I’m great, thanks for asking! I’m great, thanks for asking!', sender: 'me' },
        { id: 5, text: 'I’m great, thanks for asking! I’m great, thanks for asking! I’m great, thanks for asking!', sender: 'me' },
        { id: 6, text: 'I’m great, thanks for asking! I’m great, thanks for asking! I’m great, thanks for asking!', sender: 'me' },
        { id: 7, text: 'I’m great, thanks for asking! I’m great, thanks for asking! I’m great, thanks for asking!', sender: 'me' },
        { id: 8, text: 'I’m great, thanks for asking! I’m great, thanks for asking! I’m great, thanks for asking!', sender: 'me' },
        { id: 9, text: 'Good to hear!', sender: 'other' },
    ];
    const [showMessages, setShowMessages] = useState(false);
    const [isOpenConversation, setIsOpenConversation] = useState(false);
    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [isOpenConversation]);

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

            {/* View single applicants */}
            {
                isOpenViewApplicantModal &&
                <section className="px-3 md:px-0 fixed top-0 w-full bg-[#afafaf44] z-20 h-screen flex items-center justify-center">
                    <div className="container relative max-h-full">
                        <div className="relative w-full max-w-xl mx-auto">
                            <ViewSingleApplicantModal applicants={viewApplicant} />

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

            {/* Message component */}
            <section className='md:w-[200px] p-2 rounded-t-md absolute right-1 border shadow-sm bottom-0 flex justify-between items-center'>
                <div className='hidden md:flex items-center'>
                    <div className='w-8 h-8 relative'>
                        <img className='w-full h-full object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQUQ6g6NjGqj3qncgsJGpxzzRrL_qDAc1qQ&s" alt="Profile image" />
                        <div className='absolute right-0 bottom-0'>
                            <div className='h-3 w-3 bg-green-500 border border-white rounded-full'></div>
                        </div>
                    </div>
                    <p className='text-sm font-medium ml-2'>Messaging</p>
                </div>
                <button onClick={() => setShowMessages(true)} className='text-base font-medium text-white bg-indigo-600 px-2 py-1 rounded-full'>
                    <i className="ri-message-2-fill"></i>
                </button>
            </section>
            {
                showMessages &&
                <section className='z-10 w-[250px] rounded-t-md absolute right-1 border shadow-sm bottom-0 bg-white overflow-y-auto max-h-[337px]'>
                    <div className='flex justify-between items-center p-2 border-b-2 fixed bg-white w-[248px]'>
                        <div className='flex items-center'>
                            <div className='w-8 h-8 relative'>
                                <img className='w-full h-full object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQUQ6g6NjGqj3qncgsJGpxzzRrL_qDAc1qQ&s" alt="Profile image" />
                                <div className='absolute right-0 bottom-0'>
                                    <div className='h-3 w-3 bg-green-500 border border-white rounded-full'></div>
                                </div>
                            </div>
                            <p className='text-sm font-medium ml-2'>Messaging</p>
                        </div>
                        <button onClick={() => setShowMessages(false)} className='text-xl font-medium text-white bg-indigo-600 w-8 h-8 flex items-center justify-center rounded-full'>
                            <i className="ri-close-fill"></i>
                        </button>
                    </div>
                    {/* conversation */}
                    <div className='mt-[50px]'>
                        <div className='flex items-center p-2 cursor-pointer hover:bg-[#f7f7f7] border-b' onClick={() => setIsOpenConversation(true)}>
                            <div className='w-10 h-10 mr-2'>
                                <img className='w-full h-full object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQUQ6g6NjGqj3qncgsJGpxzzRrL_qDAc1qQ&s" alt="Profile image" />
                            </div>
                            <div>
                                <h1 className='text-sm text-gray-800 font-medium'>Yash patel</h1>
                                <p className='text-[12px] text-gray-500 font-medium'>Oct 10</p>
                            </div>
                        </div>
                        <div className='flex items-center p-2 cursor-pointer hover:bg-[#f7f7f7] border-b'>
                            <div className='w-10 h-10 mr-2'>
                                <img className='w-full h-full object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQUQ6g6NjGqj3qncgsJGpxzzRrL_qDAc1qQ&s" alt="Profile image" />
                            </div>
                            <div>
                                <h1 className='text-sm text-gray-800 font-medium'>Yash patel</h1>
                                <p className='text-[12px] text-gray-500 font-medium'>Oct 10</p>
                            </div>
                        </div>
                        <div className='flex items-center p-2 cursor-pointer hover:bg-[#f7f7f7] border-b'>
                            <div className='w-10 h-10 mr-2'>
                                <img className='w-full h-full object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQUQ6g6NjGqj3qncgsJGpxzzRrL_qDAc1qQ&s" alt="Profile image" />
                            </div>
                            <div>
                                <h1 className='text-sm text-gray-800 font-medium'>Yash patel</h1>
                                <p className='text-[12px] text-gray-500 font-medium'>Oct 10</p>
                            </div>
                        </div>
                        <div className='flex items-center p-2 cursor-pointer hover:bg-[#f7f7f7] border-b'>
                            <div className='w-10 h-10 mr-2'>
                                <img className='w-full h-full object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQUQ6g6NjGqj3qncgsJGpxzzRrL_qDAc1qQ&s" alt="Profile image" />
                            </div>
                            <div>
                                <h1 className='text-sm text-gray-800 font-medium'>Yash patel</h1>
                                <p className='text-[12px] text-gray-500 font-medium'>Oct 10</p>
                            </div>
                        </div>
                        <div className='flex items-center p-2 cursor-pointer hover:bg-[#f7f7f7] border-b'>
                            <div className='w-10 h-10 mr-2'>
                                <img className='w-full h-full object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQUQ6g6NjGqj3qncgsJGpxzzRrL_qDAc1qQ&s" alt="Profile image" />
                            </div>
                            <div>
                                <h1 className='text-sm text-gray-800 font-medium'>Yash patel</h1>
                                <p className='text-[12px] text-gray-500 font-medium'>Oct 10</p>
                            </div>
                        </div>
                    </div>
                </section>
            }
            {
                isOpenConversation &&
                <section className="z-20 absolute right-0 md:right-1 h-screen md:h-fit bottom-0 bg-[#fcfcfc] flex flex-col w-full md:w-[500px] md:rounded-t-md md:border">
                    <div className='flex justify-between items-center p-2 border-b mb-2'>
                        <div className='flex items-center'>
                            <div className='w-8 h-8 relative'>
                                <img className='w-full h-full object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQUQ6g6NjGqj3qncgsJGpxzzRrL_qDAc1qQ&s" alt="Profile image" />
                                <div className='absolute right-0 bottom-0'>
                                    <div className='h-3 w-3 bg-green-500 border border-white rounded-full'></div>
                                </div>
                            </div>
                            <p className='text-sm font-medium ml-2'>Yash patel</p>
                        </div>
                        <button onClick={() => setIsOpenConversation(false)} className='text-base font-medium text-white bg-indigo-600 px-2 py-1 rounded-full'>
                            <i className="ri-close-fill"></i>
                        </button>
                    </div>
                    <div ref={chatContainerRef} className="mb-[66px] md:max-h-[400px] overflow-y-auto hide-scrollbar space-y-1 px-2">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-64 p-2 rounded-lg text-white text-sm ${message.sender === 'me' ? 'bg-indigo-500' : 'bg-gray-500'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className='p-2 fixed w-full bottom-0 z-10 bg-[#fcfcfc]'>
                        <div className='bg-white rounded-md p-2 flex items-center justify-between w-full border focus-within:border-indigo-500'>
                            <input
                                type="text"
                                placeholder="Type a message"
                                className="bg-transparent outline-none bottom-0 w-full pr-2"
                            />
                            <button className="bg-[#14a800] text-white rounded-full w-8 h-8 flex items-center justify-center text-base">
                                <i className="ri-send-plane-2-fill"></i>
                            </button>
                        </div>
                    </div>
                </section>
            }
        </>
    );
};

export default EmployeApplicants;
