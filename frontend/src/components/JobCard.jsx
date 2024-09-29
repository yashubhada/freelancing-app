import React from 'react'
import { formatDistanceToNow } from 'date-fns';

const JobCard = ({ job, isSelected, onClick }) => {
    // Convert job.datePosted to a readable "time ago" format
    const formattedDate = formatDistanceToNow(new Date(job.datePosted), { addSuffix: true });

    return (
        <div className={`flex items-start p-4 border border-gray-200 rounded-lg ${isSelected ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-50 transition ease-in-out duration-150 cursor-pointer`} onClick={onClick}>
            <div className='w-12 mr-4'>
                <img src={job.postedBy.companyLogo} alt="Company Logo" className='w-full h-full object-contain' />
            </div>
            <div className='flex-1'>
                <h2 className='font-semibold text-lg text-gray-800'>{job.title}</h2>
                <p className='text-sm text-gray-600'>{job.postedBy.companyName}</p>
                <p className='text-xs text-gray-400'>{job.location}</p>
                <p className='text-xs text-gray-600 mt-2'>{formattedDate}</p>
            </div>
        </div>
    )
}

export default JobCard
