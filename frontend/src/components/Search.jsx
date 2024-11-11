import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Search = () => {

    document.title = "Search | PROFLEX";

    const navigate = useNavigate();

    const url = "https://proflex-13tx.onrender.com"; // API URL

    const [jobberInfo, setJobberInfo] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const fetchAllJobbers = async () => {
        try {
            const response = await axios.post(`${url}/jobber/fetchAllJobbers`);
            setJobberInfo(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value.length > 0) {
            const filteredData = jobberInfo.filter((jobber) =>
                jobber.name.toLowerCase().includes(value.toLowerCase())
            );
            setSearchResult(filteredData);
        } else {
            setSearchResult([]);
        }
    };

    const [searchProfile, setSearchProfile] = useState({});
    const [isSearchProfileOpen, setIsSearchProfileOpen] = useState(false);

    const token = localStorage.getItem('token');

    const openProfileModal = async (profile) => {
        try {
            const response = await axios.get(`${url}/jobber/userTokenVerify`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            if (response.data.user.role !== "JobSeeker") {
                navigate('/signin');
            }

            if (response.data.user.userId) {
                if (response.data.user.userId === profile._id) {
                    navigate('/profile');
                }
                setSearchProfile(profile);
                setIsSearchProfileOpen(true);
            }

            const response2 = await axios.post(`${url}/conversation/conversationExist`, {
                participant1Id: response.data.user.userId,
                participant2Id: profile._id
            });
            if (response2.status === 200) {
                setMsgAvailable(true);
            }
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate('/signin');
            } else {
                console.error('Error fetching Profile:', error.response?.data || error.message);
            }
        }
    }

    const closeModal = () => {
        setIsSearchProfileOpen(false);
        setSearchProfile({});
    }

    const [isOpenFirstConversation, setIsOpenFirstConversation] = useState(false);
    const [sendToUserInfo, setSendToUserInfo] = useState(null);
    const [loggedInuserInfo, setLoggedInuserInfo] = useState([]);
    const [msgAvailable, setMsgAvailable] = useState(false);

    const openMessageBox = async (userProfile) => {
        try {
            const response = await axios.get(`${url}/jobber/userTokenVerify`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            if (response.data.user.role !== "JobSeeker") {
                navigate('/signin');
            }

            if (response.data.user.userId) {
                setLoggedInuserInfo(response.data.user);
                setIsOpenFirstConversation(true);
                if (userProfile) {
                    setSendToUserInfo(userProfile);
                }
            }
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate('/signin');
            } else {
                console.error('Error fetching user Profile:', error.response?.data || error.message);
            }
        }
    }
    const [message, setMessage] = useState('');
    const sendFirstMsg = async (e) => {
        e.preventDefault();
        if (sendToUserInfo) {
            try {
                await axios.post(`${url}/conversation/newConversation`, {
                    user1id: loggedInuserInfo.userId,
                    user1name: loggedInuserInfo.name,
                    user1ProfileImage: loggedInuserInfo.profileImage,
                    user2id: sendToUserInfo._id,
                    user2name: sendToUserInfo.name,
                    user2ProfileImage: sendToUserInfo.profileImage,
                    senderId: loggedInuserInfo.userId,
                    message
                });
                toast.success('message sent successfully');
            } catch (err) {
                console.error(err);
            } finally {
                setIsOpenFirstConversation(false);
            }
        }
    }

    useEffect(() => {
        fetchAllJobbers();
    }, []);

    return (
        <>
            <Toaster />
            <Navbar />
            <section className="px-3 md:px-0">
                <div className="container mx-auto w-full md:w-2/5 mt-5">
                    <div className="flex w-full bg-white border items-center rounded-full px-3 py-2 focus-within:border-indigo-500">
                        <i className='ri-search-line text-base mr-3'></i>
                        <input
                            value={searchValue}
                            onChange={handleSearchChange}
                            type="text"
                            className="w-full outline-none"
                            placeholder="Search peoples..."
                        />
                    </div>
                    {
                        searchResult && searchResult.length > 0 ? (
                            <ul className="w-full mt-2">
                                {searchResult.map((ary, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center py-2 px-2 cursor-pointer hover:bg-[#f0f0f0] rounded"
                                        onClick={() => openProfileModal(ary)}
                                    >
                                        <div className='flex items-center'>
                                            <div className='w-10 h-10'>
                                                <img
                                                    src={ary.profileImage}
                                                    alt="User profile image"
                                                    className='w-full h-full object-cover border rounded-full'
                                                />
                                            </div>
                                            <p className="text-base ml-3">{ary.name}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            searchValue && (
                                <p className='text-sm text-center text-red-600 mt-10'>'{searchValue}' Not found</p>
                            )
                        )
                    }
                </div>
            </section>

            {
                isSearchProfileOpen &&
                <section className="px-3 md:px-0 fixed top-0 w-full bg-[#afafaf44] z-20 h-screen flex items-center justify-center">
                    <div className="container relative max-h-full">
                        <div className="relative w-full max-w-xl mx-auto">
                            <div className='p-4 bg-white rounded-lg overflow-y-auto max-h-[80vh]'>
                                <div className='flex items-center mb-4'>
                                    <div className='w-16 h-16 mr-4'>
                                        <img src={searchProfile.profileImage} alt="User Profile Image" className='w-full h-full object-cover rounded-full' />
                                    </div>
                                    <div>
                                        <h1 className='text-base font-medium text-gray-700'>{searchProfile.name}</h1>
                                        <p className='text-base font-medium text-gray-500'>{searchProfile.email}</p>
                                        <p className='text-sm font-medium text-gray-500'>{searchProfile.profile.headline}</p>
                                    </div>
                                </div>
                                <h1 className='text-xl font-semibold text-gray-900 mb-3'>Skills</h1>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {searchProfile.profile.skills.map((skills, index) => (
                                        <p key={index} className="text-black border hover:border-black cursor-pointer px-2 py-1 rounded-lg text-sm flex items-center">
                                            {skills}
                                        </p>
                                    ))}
                                </div>
                                <h1 className='text-xl font-semibold text-gray-900 mb-3'>Experience</h1>
                                <div className="grid grid-cols-1 gap-2 mb-4">
                                    {searchProfile.profile.experience.map((exp, index) => (
                                        <div key={index} className="pl-2">
                                            <h3 className="text-base text-gray-800 font-semibold">{exp.jobTitle}</h3>
                                            <ul className='list-disc ml-4'>
                                                <li className="text-sm text-gray-600">{exp.company}</li>
                                                <li className="text-sm text-gray-600">{exp.startDate} -- {exp.endDate === null ? "Present" : exp.endDate}</li>
                                                <li className="text-sm text-gray-600">{exp.description}</li>
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                <h1 className='text-xl font-semibold text-gray-900 mb-3'>Education</h1>
                                <div className="grid grid-cols-1 gap-2 mb-4">
                                    {searchProfile.profile.education.map((edu, index) => (
                                        <div key={index} className="pl-2">
                                            <h3 className="text-base text-gray-800 font-semibold">{edu.institution}</h3>
                                            <ul className='list-disc ml-4'>
                                                <li className="text-sm text-gray-600">{edu.degree}</li>
                                                <li className="text-sm text-gray-600">{edu.year}</li>
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                <h1 className='text-xl font-semibold text-gray-900'>Resume</h1>
                                <a href={searchProfile.profile.resumeUrl} target='_blank' className='text-indigo-600 cursor-pointer hover:underline'>view resume</a>

                                <div className='mt-4 flex items-star space-x-4'>
                                    <button onClick={() => openMessageBox(searchProfile)} className='w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-1 rounded disabled:opacity-65 disabled:hover:bg-indigo-500 disabled:cursor-not-allowed' disabled={msgAvailable}>
                                        {
                                            msgAvailable
                                                ?
                                                // "user already in your conversation list"
                                                <span className="text-sm">user already in your conversation list</span>
                                                :
                                                <>
                                                    <i className="ri-send-plane-fill mr-1"></i>Message
                                                </>
                                        }
                                    </button>
                                </div>
                            </div>
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
        </>
    );
}

export default Search
