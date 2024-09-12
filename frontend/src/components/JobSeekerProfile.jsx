import React from 'react'
import UserDefaultProfile from '../images/userProfileImage.png';

const JobSeekerProfile = ({ profileData }) => {
    const { name, email, profileImage, profile } = profileData;
    return (
        <>
            <div className="max-w-6xl mx-auto p-3 md:p-0">
                <div className='p-3 md:p-5 bg-white rounded-lg border'>
                    {/* Profile Header */}
                    <div className="">
                        <div className="block md:flex items-center">
                            <div className='flex justify-center mb-5 md:mb-0 md:block'>
                                <img
                                    src={UserDefaultProfile} // profileImage
                                    alt={`${name}'s profile`}
                                    className="w-32 h-32 rounded-full object-cover border border-gray-200"
                                />
                            </div>
                            <div className="md:ml-6">
                                <h1 className="text-2xl font-bold">{name}</h1>
                                <p className="text-gray-600">{profile.headline}</p>
                                <p className="text-gray-500">{email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Bio */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">About</h2>
                        <p className="text-gray-700">{profile.bio}</p>
                    </div>

                    {/* Skills Section */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {profile.skills.map((skill, index) => (
                                <p key={index} className="bg-[#108a00] text-white px-2 py-1 rounded-lg text-sm">{skill}</p>
                            ))}
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Experience</h2>
                        {profile.experience.map((exp, index) => (
                            <div key={index} className="pl-5">
                                <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                                <p className="text-gray-600">{exp.company}</p>
                                <p className="text-gray-500">
                                    {exp.startDate} - {exp.endDate || 'Present'}
                                </p>
                                <p className="text-gray-700">{exp.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Education Section */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Education</h2>
                        {profile.education.map((edu, index) => (
                            <div key={index} className="pl-5">
                                <h3 className="text-lg font-semibold">{edu.institution}</h3>
                                <p className="text-gray-600">{edu.degree}</p>
                                <p className="text-gray-500">{edu.year}</p>
                            </div>
                        ))}
                    </div>

                    {/* Resume Link */}
                    <div className="mt-6">
                        <a
                            href={profile.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 font-semibold"
                        >
                            View Resume
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default JobSeekerProfile
