import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { AppContext } from './context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobSeekerProfile = () => { 
    const { fetchJobberInfo, userProfileInfo } = useContext(AppContext);
    const navigate = useNavigate();

    const url = "http://localhost:9171"; // API URL
    const [loading, setLoading] = useState(true);

    const isEmployeSignin = async () => {
        try {
            const response = await axios.get(`${url}/jobber/userTokenVerify`, {
                withCredentials: true,
            });
            fetchJobberInfo(response.data.user.userId);
            if (response.data.user.role !== "JobSeeker") {
                navigate('/signin');
            }
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
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

    if (loading) return <p>Loading...</p>;

    // Default values in case userProfileInfo is still empty
    const {
        name = "Name not available",
        email = "Email not available",
        profileImage = "",
        profile = { headline: "", bio: "", skills: [], experience: [], education: [] },
    } = userProfileInfo || {};

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto p-3 md:p-0 mt-5 md:mt-10">
                {/* Profile Header */}
                <div className="p-5 bg-white rounded-lg border relative">
                    <div className="block md:flex items-center">
                        <div className='flex justify-center mb-5 md:mb-0 md:block'>
                            <img
                                src={profileImage}
                                alt={`${name}'s profile`}
                                className="w-32 h-32 rounded-full object-cover border border-gray-200"
                            />
                        </div>
                        <div className="md:ml-6 text-center md:text-left">
                            <h1 className="text-2xl font-bold">{name}</h1>
                            <p className="text-gray-600">{profile.headline || "No headline availale"}</p>
                            <p className="text-gray-500">{email}</p>
                        </div>
                    </div>
                    <div className='absolute top-1 right-1 hover:bg-gray-100 w-10 h-10 text-center rounded-full cursor-pointer'>
                        <i className="ri-pencil-fill text-2xl leading-10"></i>
                    </div>
                </div>

                {/* Profile Bio */}
                <div className="mt-6 p-5 bg-white rounded-lg border relative">
                    <h2 className="text-xl font-semibold mb-2">About</h2>
                    <p className="text-gray-700">{profile.bio || "No bio available"}</p>
                    <div className='absolute top-1 right-1 hover:bg-gray-100 w-10 h-10 text-center rounded-full cursor-pointer'>
                        <i className="ri-pencil-fill text-2xl leading-10"></i>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mt-6 p-5 bg-white rounded-lg border relative">
                    <h2 className="text-xl font-semibold mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {profile.skills.length > 0 ? (
                            profile.skills.map((skill, index) => (
                                <p key={index} className="bg-[#108a00] text-white px-2 py-1 rounded-lg text-sm">{skill}</p>
                            ))
                        ) : (
                            <p>No skills available</p>
                        )}
                    </div>
                    <div className='absolute top-1 right-1 hover:bg-gray-100 w-10 h-10 text-center rounded-full cursor-pointer'>
                        <i className="ri-pencil-fill text-2xl leading-10"></i>
                    </div>
                </div>

                {/* Experience Section */}
                <div className="mt-6 p-5 bg-white rounded-lg border relative">
                    <h2 className="text-xl font-semibold mb-2">Experience</h2>
                    {profile.experience.length > 0 ? (
                        profile.experience.map((exp, index) => (
                            <div key={index} className="pl-5">
                                <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                                <p className="text-gray-600">{exp.company}</p>
                                <p className="text-gray-500">
                                    {exp.startDate} - {exp.endDate || 'Present'}
                                </p>
                                <p className="text-gray-700">{exp.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No experience available</p>
                    )}
                    <div className='absolute top-1 right-1 hover:bg-gray-100 w-10 h-10 text-center rounded-full cursor-pointer'>
                        <i className="ri-pencil-fill text-2xl leading-10"></i>
                    </div>
                </div>

                {/* Education Section */}
                <div className="mt-6 p-5 bg-white rounded-lg border relative">
                    <h2 className="text-xl font-semibold mb-2">Education</h2>
                    {profile.education.length > 0 ? (
                        profile.education.map((edu, index) => (
                            <div key={index} className="pl-5">
                                <h3 className="text-lg font-semibold">{edu.institution}</h3>
                                <p className="text-gray-600">{edu.degree}</p>
                                <p className="text-gray-500">{edu.year}</p>
                            </div>
                        ))
                    ) : (
                        <p>No education information available</p>
                    )}
                    <div className='absolute top-1 right-1 hover:bg-gray-100 w-10 h-10 text-center rounded-full cursor-pointer'>
                        <i className="ri-pencil-fill text-2xl leading-10"></i>
                    </div>
                </div>

                {/* Resume Link */}
                <div className="mt-6 p-5 bg-white rounded-lg border">
                    {profile.resumeUrl ? (
                        <a
                            href={profile.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 font-semibold"
                        >
                            View Resume
                        </a>
                    ) : (
                        <p>No resume available. <span className='text-blue-600 cursor-pointer hover:text-blue-700 hover:underline'>Add</span></p>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default JobSeekerProfile;
