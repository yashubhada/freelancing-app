import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'

const ViewSingleApplicantModal = ({ applicants, job, openMessageBox, closeModal }) => {

    const url = "https://proflex-13tx.onrender.com"; // API URL

    const [msgAvailable, setMsgAvailable] = useState(false);
    const [employerId, setEmployerId] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setEmployerId(decoded.userId);
        }
    }, []);

    const checkMsgSet = async () => {
        try {
            const response = await axios.post(`${url}/conversation/conversationExist`, {
                participant1Id: employerId,
                participant2Id: applicants.userId
            });
            if (response.status === 200) {
                setMsgAvailable(true);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        checkMsgSet();
    }, [checkMsgSet]);

    const rejectApplication = async () => {
        try {
            await axios.post(`${url}/jobPost/removeJobApplication/${job.jobId}/${applicants._id}`);
            closeModal();
        } catch (err) {
            console.error(err);
        }
    }

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

            <div className='mt-4 flex items-star space-x-4'>
                <button onClick={() => openMessageBox(applicants)} className='w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-1 rounded disabled:opacity-65 disabled:hover:bg-indigo-500 disabled:cursor-not-allowed' disabled={msgAvailable}>
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
                <button onClick={rejectApplication} className={`${msgAvailable && 'hidden'} w-full bg-red-500 hover:bg-red-600 text-white font-medium py-1 rounded`}>
                    Reject
                </button>
            </div>
        </div>
    )
}

export default ViewSingleApplicantModal
