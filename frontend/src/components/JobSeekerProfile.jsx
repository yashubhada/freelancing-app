import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { AppContext } from './context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const JobSeekerProfile = () => {
    const { fetchJobberInfo, userProfileInfo } = useContext(AppContext);
    const navigate = useNavigate();

    const url = "http://localhost:9171"; // API URL
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    const isEmployeSignin = async () => {
        try {
            const response = await axios.get(`${url}/jobber/userTokenVerify`, {
                withCredentials: true,
            });
            setUserId(response.data.user.userId);
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

    // Default values in case userProfileInfo is still empty
    const {
        name = "Name not available",
        email = "Email not available",
        profileImage = "",
        profile = { headline: "", bio: "", skills: [], experience: [], education: [] },
    } = userProfileInfo || {};

    // States for editing bio
    const [bio, setBio] = useState(profile.bio || "");
    const [isEditingBio, setIsEditingBio] = useState(false);
    const handleUpdateBio = async () => {
        try {
            const response = await axios.put(`${url}/jobber/updateProfile/bio`, {
                userId,
                bio, // new bio value
            });
            // Update local state with new bio
            fetchJobberInfo(userId); // Refresh the user profile
            setIsEditingBio(false);
            toast.success(response.data.msg);
        } catch (error) {
            console.error("Error updating bio:", error);
        }
    };

    // State for editing skills
    const [existingSkills, setExistingSkills] = useState(profile.skills || []);
    const [previewSkills, setPreviewSkills] = useState(profile.skills || []);
    const [newSkill, setNewSkill] = useState('');
    const [isEditingSkills, setIsEditingSkills] = useState(false);

    // Ensure skills are fetched on component mount
    useEffect(() => {
        if (profile.skills) {
            setExistingSkills(profile.skills);
            setPreviewSkills(profile.skills);
        }
    }, [profile.skills]);

    const handleAddSkill = () => {
        if (newSkill === "") return toast.error('Please enter skill');
        if (previewSkills.includes(newSkill)) return toast.error('Skill is already added');
        if (newSkill.trim() && !previewSkills.includes(newSkill)) {
            setPreviewSkills([...previewSkills, newSkill]);
            setNewSkill(''); // Clear input after adding
        }
    };

    const handleRemoveSkill = (indexToRemove) => {
        const updatedSkills = [...previewSkills];
        updatedSkills.splice(indexToRemove, 1); // Remove skill using index
        setPreviewSkills(updatedSkills);
    };

    const handleSaveSkills = async () => {
        try {
            const response = await axios.put(`${url}/jobber/updateProfile/skills`, {
                userId,
                skills: previewSkills, // Send updated skills to backend
            });
            setExistingSkills(previewSkills); // Sync with backend data
            setIsEditingSkills(false);
            toast.success(response.data.msg);
        } catch (error) {
            console.error("Error updating skills:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Navbar />
            <Toaster />
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

                {/* Profile Bio Section */}
                <div className="mt-6 p-5 bg-white rounded-lg border relative">
                    <h2 className="text-xl font-semibold mb-2">About</h2>
                    {isEditingBio ? (
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder='Enter your bio here'
                            className="w-full p-2 border rounded focus:outline-indigo-500"
                        />
                    ) : (
                        <p className="text-gray-700">{profile.bio || "No bio available"}</p>
                    )}
                    <div className='absolute top-1 right-1 hover:bg-gray-100 w-10 h-10 text-center rounded-full cursor-pointer'>
                        <i
                            className="ri-pencil-fill text-2xl leading-10"
                            onClick={() => setIsEditingBio(!isEditingBio)}
                        />
                    </div>
                    {isEditingBio && (
                        <button
                            onClick={handleUpdateBio}
                            className="font-medium text-sm mt-2 px-2 py-1 bg-blue-600 text-white rounded"
                        >
                            Save
                        </button>
                    )}
                </div>

                {/* Skills Section */}
                <div className="mt-6 p-5 bg-white rounded-lg border relative">
                    <h2 className="text-xl font-semibold mb-2">Skills</h2>
                    {
                        isEditingSkills ? (
                            <div>
                                <div className='flex items-center space-x-3'>
                                    <input
                                        type="text"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        className='w-full md:w-96 px-3 py-1 border rounded focus:outline-indigo-500'
                                    />
                                    <button onClick={handleAddSkill} className='bg-gray-500 text-white px-2 py-1 rounded text-sm'>Add</button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {previewSkills.map((skill, index) => (
                                        <p key={index} className="bg-[#108a00] text-white px-2 py-1 rounded-lg text-sm flex items-center">
                                            {skill}
                                            <span className='ml-2 cursor-pointer' onClick={() => handleRemoveSkill(index)}>
                                                <i className="text-base ri-close-line"></i>
                                            </span>
                                        </p>
                                    ))}
                                </div>
                                <button onClick={handleSaveSkills} className="font-medium text-sm mt-3 px-2 py-1 bg-blue-600 text-white rounded">
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {existingSkills.length > 0 ? (
                                    existingSkills.map((skill, index) => (
                                        <p key={index} className="bg-[#108a00] text-white px-2 py-1 rounded-lg text-sm">{skill}</p>
                                    ))
                                ) : (
                                    <p>No skills available</p>
                                )}
                            </div>
                        )
                    }
                    <div onClick={() => setIsEditingSkills(!isEditingSkills)} className='absolute top-1 right-1 hover:bg-gray-100 w-10 h-10 text-center rounded-full cursor-pointer'>
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
                                    {exp.startDate.split('T')[0]} - {exp.endDate.split('T')[0] || "Present"}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No experience added</p>
                    )}
                </div>

                {/* Education Section */}
                <div className="mt-6 p-5 bg-white rounded-lg border relative">
                    <h2 className="text-xl font-semibold mb-2">Education</h2>
                    {profile.education.length > 0 ? (
                        profile.education.map((edu, index) => (
                            <div key={index} className="pl-5">
                                <h3 className="text-lg font-semibold">{edu.degree}</h3>
                                <p className="text-gray-600">{edu.institution}</p>
                                <p className="text-gray-500">{edu.graduationDate}</p>
                            </div>
                        ))
                    ) : (
                        <p>No education added</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default JobSeekerProfile;
