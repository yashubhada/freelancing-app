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

    // get 100 years
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100;
    const yearsArray = [];
    for (let year = currentYear; year >= startYear; year--) {
        yearsArray.push(year);
    }
    const monthsArray = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const itCourses = [
        'BCA - Bachelor of Computer Applications',
        'BTech - Bachelor of Technology',
        'MCA - Master of Computer Applications',
        'MTech - Master of Technology',
        'BSc CS - Bachelor of Science in Computer Science',
        'MSc CS - Master of Science in Computer Science',
        'BE - Bachelor of Engineering',
        'ME - Master of Engineering',
        'BSc IT - Bachelor of Science in Information Technology',
        'MSc IT - Master of Science in Information Technology',
        'Diploma in IT - Diploma in Information Technology',
        'PhD in CS - Doctor of Philosophy in Computer Science',
        'PhD in IT - Doctor of Philosophy in Information Technology',
        'BSc Software Engineering - Bachelor of Science in Software Engineering',
        'MSc Software Engineering - Master of Science in Software Engineering',
        'BSc Data Science - Bachelor of Science in Data Science',
        'MSc Data Science - Master of Science in Data Science',
        'BSc Artificial Intelligence - Bachelor of Science in Artificial Intelligence',
        'MSc Artificial Intelligence - Master of Science in Artificial Intelligence',
        'BSc Cyber Security - Bachelor of Science in Cyber Security',
        'MSc Cyber Security - Master of Science in Cyber Security',
        'BSc Information Systems - Bachelor of Science in Information Systems',
        'MSc Information Systems - Master of Science in Information Systems',
        'BSc Cloud Computing - Bachelor of Science in Cloud Computing',
        'MSc Cloud Computing - Master of Science in Cloud Computing',
        'BSc Blockchain - Bachelor of Science in Blockchain Technology',
        'MSc Blockchain - Master of Science in Blockchain Technology',
        'BSc Network Engineering - Bachelor of Science in Network Engineering',
        'MSc Network Engineering - Master of Science in Network Engineering',
        'BSc Game Development - Bachelor of Science in Game Development',
        'MSc Game Development - Master of Science in Game Development',
        'BSc IT Management - Bachelor of Science in IT Management',
        'MSc IT Management - Master of Science in IT Management',
        'BSc Web Development - Bachelor of Science in Web Development',
        'MSc Web Development - Master of Science in Web Development'
    ];

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
    // Ensure skills are fetched on component mount
    useEffect(() => {
        if (profile.bio) {
            setBio(profile.bio);
        }
    }, [profile.bio]);
    // Update Bio
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
    // Add skill
    const handleAddSkill = () => {
        if (newSkill === "") return toast.error('Please enter skill');
        if (previewSkills.includes(newSkill)) return toast.error('Skill is already added');
        if (newSkill.trim() && !previewSkills.includes(newSkill)) {
            setPreviewSkills([...previewSkills, newSkill]);
            setNewSkill(''); // Clear input after adding
        }
    };
    // Remove skill
    const handleRemoveSkill = (indexToRemove) => {
        const updatedSkills = [...previewSkills];
        updatedSkills.splice(indexToRemove, 1); // Remove skill using index
        setPreviewSkills(updatedSkills);
    };
    // Save skill into DB
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


    // State for editing experience
    const [isExperienceEndDate, setIsExperienceEndDate] = useState(true);
    const [experienceCredentials, setExperienceCredentials] = useState({
        jobTitle: "",
        company: "",
        startMonth: "January",
        startYear: currentYear,
        endMonth: "January",
        endYear: currentYear,
        description: "",
    });
    const [existingExperience, setExistingExperience] = useState(profile.experience || []);
    const [isEditingExperience, setIsEditingExperience] = useState(false);

    // Handle experience form changes
    const handleExperienceInputChange = (e) => {
        const { name, value } = e.target;
        setExperienceCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle Experience Save
    const handleExperienceSave = async (e) => {
        e.preventDefault();
        const newExperience = {
            ...experienceCredentials,
            startDate: `${experienceCredentials.startMonth} ${experienceCredentials.startYear}`,
            endDate: isExperienceEndDate
                ? null
                : `${experienceCredentials.endMonth} ${experienceCredentials.endYear}`,
        };
        try {
            const response = await axios.put(`${url}/jobber/updateProfile/experience`, {
                userId,
                experience: [...existingExperience, newExperience],
            });
            setExistingExperience([...existingExperience, newExperience]);
            setIsEditingExperience(false);
            fetchJobberInfo(userId);
            toast.success(response.data.msg);
        } catch (error) {
            console.error("Error updating experience:", error);
        }
    };

    useEffect(() => {
        setExistingExperience(profile.experience);
    }, [profile.experience]);



    // State for editing Education
    const [isEditEducation, setIsEditEducation] = useState(false);
    const [existingEducation, setExistingEducation] = useState(profile.education || []);
    const [educationCredentials, setEducationCredentials] = useState({
        institution: "",
        degree: itCourses[0],
        year: currentYear
    });

    const handleChangeEducation = (e) => {
        const { name, value } = e.target;
        setEducationCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleEducationSave = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`${url}/jobber/updateProfile/education`, {
                userId,
                education: [...existingEducation, educationCredentials],
            });
            setExistingEducation([...existingEducation, educationCredentials]);
            setIsEditEducation(false);
            fetchJobberInfo(userId);
            toast.success(response.data.msg);
        } catch (error) {
            console.error("Error updating education:", error);
        }
    }

    useEffect(() => {
        setExistingEducation(profile.education);
    }, [profile.education])

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
                    <div onClick={() => setIsEditingBio(!isEditingBio)} className='absolute top-1 right-1 hover:bg-gray-100 w-10 h-10 text-center rounded-full cursor-pointer'>
                        <i className="ri-pencil-fill text-2xl leading-10" />
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
                    <div className='space-y-3'>
                        {
                            isEditingExperience ?
                                <div>
                                    <form onSubmit={handleExperienceSave} autoComplete='off'>
                                        <div className='mb-5'>
                                            <label className='mb-1 block'>Job title</label>
                                            <input type="text" name='jobTitle' onChange={handleExperienceInputChange} className='w-full px-3 py-1 border rounded focus:outline-indigo-500' required />
                                        </div>
                                        <div className='mb-5'>
                                            <label className='mb-1 block'>Company name</label>
                                            <input type="text" name='company' onChange={handleExperienceInputChange} className='w-full px-3 py-1 border rounded focus:outline-indigo-500' required />
                                        </div>
                                        <div className='mb-5 flex items-center space-x-3 md:space-x-10'>
                                            <div className='w-full'>
                                                <label className='mb-1 block'>Start month</label>
                                                <select name='startMonth' onChange={handleExperienceInputChange} className='w-full px-2 py-1 border rounded focus:outline-indigo-500' required>
                                                    {
                                                        monthsArray.map((ary, i) => {
                                                            return <option value={ary} key={i}>{ary}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className='w-full'>
                                                <label className='mb-1 block'>Start year</label>
                                                <select name='startYear' onChange={handleExperienceInputChange} className='w-full px-2 py-1 border rounded focus:outline-indigo-500' required>
                                                    {
                                                        yearsArray.map((ary, i) => {
                                                            return <option value={ary} key={i}>{ary}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className='mb-5'>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={isExperienceEndDate}
                                                    onChange={() => setIsExperienceEndDate(!isExperienceEndDate)}
                                                    className="hidden"
                                                />
                                                <span
                                                    className={`w-5 h-5 rounded mr-3 border border-[#108a00] ${isExperienceEndDate ? 'bg-[#108a00]' : 'bg-white'
                                                        } flex items-center justify-center`}
                                                >
                                                    {isExperienceEndDate && (
                                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </span>
                                                I am currently working in this role
                                            </label>
                                        </div>
                                        <div className='mb-5 flex items-center space-x-3 md:space-x-10'>
                                            <div className='w-full'>
                                                <label className='mb-1 block'>End month</label>
                                                <select name='endMonth' onChange={handleExperienceInputChange} disabled={isExperienceEndDate} className='w-full px-2 py-1 border rounded focus:outline-indigo-500' required>
                                                    {
                                                        monthsArray.map((ary, i) => {
                                                            return <option value={ary} key={i}>{ary}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className='w-full'>
                                                <label className='mb-1 block'>End year</label>
                                                <select name='endYear' onChange={handleExperienceInputChange} disabled={isExperienceEndDate} className='w-full px-2 py-1 border rounded focus:outline-indigo-500' required>
                                                    {
                                                        yearsArray.map((ary, i) => {
                                                            return <option value={ary} key={i}>{ary}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className='mb-5'>
                                            <label className='mb-1 block'>Description</label>
                                            <textarea name='description' onChange={handleExperienceInputChange} className='w-full px-3 py-1 border rounded focus:outline-indigo-500' required />
                                        </div>
                                        <button type='submit' className='font-medium text-sm px-2 py-1 bg-blue-600 text-white rounded'>Add</button>
                                    </form>
                                </div>
                                :
                                (
                                    profile.experience.length > 0 ? (
                                        profile.experience.map((exp, index) => (
                                            <div key={index} className="pl-2">
                                                <h3 className="text-base text-gray-800 font-semibold">{exp.jobTitle}</h3>
                                                <ul className='list-disc ml-4'>
                                                    <li className="text-sm text-gray-600">{exp.company}</li>
                                                    <li className="text-sm text-gray-600">{exp.startDate} -- {exp.endDate === null ? "Present" : exp.endDate}</li>
                                                    <li className="text-sm text-gray-600">{exp.description}</li>
                                                </ul>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No experience added</p>
                                    )
                                )
                        }
                    </div>
                    <div onClick={() => setIsEditingExperience(!isEditingExperience)} className='absolute top-1 right-1 hover:bg-gray-100 w-10 h-10 text-center rounded-full cursor-pointer'>
                        <i className="ri-pencil-fill text-2xl leading-10"></i>
                    </div>
                </div>

                {/* Education Section */}
                <div className="mt-6 p-5 bg-white rounded-lg border relative">
                    <h2 className="text-xl font-semibold mb-2">Education</h2>
                    <div className='space-y-3'>
                        {
                            isEditEducation ?
                                <form onSubmit={handleEducationSave} autoComplete='off'>
                                    <div className='mb-5'>
                                        <label className='mb-1 block'>Institution</label>
                                        <input type="text" name='institution' onChange={handleChangeEducation} className='w-full px-3 py-1 border rounded focus:outline-indigo-500' required />
                                    </div>
                                    <div className='mb-5 flex items-center space-x-3 md:space-x-10'>
                                        <div className='w-full'>
                                            <label className='mb-1 block'>Degree</label>
                                            <select name='degree' onChange={handleChangeEducation} className='w-full px-2 py-1 border rounded focus:outline-indigo-500' required>
                                                {
                                                    itCourses.map((ary, i) => {
                                                        return <option value={ary} key={i}>{ary}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className='w-full'>
                                            <label className='mb-1 block'>Year</label>
                                            <select name='year' onChange={handleChangeEducation} className='w-full px-2 py-1 border rounded focus:outline-indigo-500' required>
                                                {
                                                    yearsArray.map((ary, i) => {
                                                        return <option value={ary} key={i}>{ary}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <button type='submit' className='font-medium text-sm px-2 py-1 bg-blue-600 text-white rounded'>Add</button>
                                </form>
                                :
                                (
                                    profile.education.length > 0 ? (
                                        profile.education.map((edu, index) => (
                                            <div key={index} className="pl-2">
                                                <h3 className="text-base text-gray-800 font-semibold">{edu.degree}</h3>
                                                <ul className='list-disc ml-4'>
                                                    <li className="text-sm text-gray-600">{edu.institution}</li>
                                                    <li className="text-sm text-gray-600">{edu.year}</li>
                                                </ul>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No education added</p>
                                    )
                                )
                        }
                    </div>
                    <div onClick={() => setIsEditEducation(!isEditEducation)} className='absolute top-1 right-1 hover:bg-gray-100 w-10 h-10 text-center rounded-full cursor-pointer'>
                        <i className="ri-pencil-fill text-2xl leading-10"></i>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    );
};

export default JobSeekerProfile;
