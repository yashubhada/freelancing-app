import React from 'react'

const ViewSingleApplicantModal = ({ applicants }) => {
    console.log("Modal : ", applicants);
    return (
        <div className='p-4 bg-white rounded-lg overflow-y-auto max-h-[80vh]'>
            <h1 className='text-lg font-semibold text-gray-900 mb-4'>{applicants.jobTitle}</h1>
            <div className='flex items-center mb-4'>
                <div className='w-16 h-16 mr-4'>
                    <img src={applicants.profileImage} alt="User Profile Image" className='w-full h-full object-cover rounded-full' />
                </div>
                <div>
                    <h1 className='text-base font-medium text-gray-700'>{applicants.name}</h1>
                    <p className='text-base font-medium text-gray-500'>{applicants.email}</p>
                    <p className='text-sm font-medium text-gray-500'>{applicants.headline}</p>
                </div>
            </div>
            <h1 className='text-base font-semibold text-gray-900 mb-3'>Skills</h1>
            <div className="flex flex-wrap gap-2 mb-4">
                {applicants.skills.map((skills, index) => (
                    <p key={index} className="text-black border hover:border-black cursor-pointer px-2 py-1 rounded-lg text-sm flex items-center">
                        {skills}
                    </p>
                ))}
            </div>
            <h1 className='text-base font-semibold text-gray-900 mb-3'>Experience</h1>
            <div className="flex flex-wrap gap-2 mb-4">
                {applicants.experience.map((exp, index) => (
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

            <h1 className='text-base font-semibold text-gray-900'>CoverLetter</h1>
            <p className='text-sm text-gray-700 mb-4'>{applicants.coverLetter}</p>

            <h1 className='text-base font-semibold text-gray-900'>Resume</h1>
            <a href={applicants.resumeUrl} target='_blank' className='text-indigo-600 cursor-pointer hover:underline'>view resume</a>
        </div>
    )
}

export default ViewSingleApplicantModal
