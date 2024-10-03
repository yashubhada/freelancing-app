import { formatDistanceToNow } from 'date-fns';
import React from 'react'

const ViewSingleJobModal = ({ job }) => {

    const formattedDate = formatDistanceToNow(new Date(job.datePosted), { addSuffix: true });

    return (
        <div className='p-4 border border-gray-200 rounded-lg bg-white mb-5'>
            <div className='flex items-center'>
                <div className='w-14 mr-3'>
                    <img
                        src={job.postedBy.companyLogo}
                        alt="Company Logo"
                        className='w-full h-full object-contain'
                    />
                </div>
                <p className='text-sm font-normal text-gray-700'>{job.postedBy.companyName}</p>
            </div>
            <h2 className='text-lg font-semibold text-gray-800 mt-2'>{job.title}</h2>
            <p className='text-xs text-gray-400 mt-1'>{job.location} · {formattedDate}</p>
            <p className='font-medium text-sm text-gray-600 mt-1'>
                <span className='text-lg mr-2'><i className="ri-briefcase-4-fill"></i></span>Employment time : {job.employmentType} · Entry level
            </p>
            <p className='font-medium text-sm text-gray-600 mt-1'>
                <span className='text-lg mr-2'><i className="ri-list-check-3"></i></span>Skills : {job.requirements.join(", ")}
            </p>
            <p className='font-medium text-sm text-gray-600 mt-1'>
                <span className='text-lg mr-2'><i className="ri-money-rupee-circle-fill"></i></span>
                Salary Range : ₹{job.salaryRange.min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/(\d+),(\d{2})$/, '$1,$2')} - ₹{job.salaryRange.max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/(\d+),(\d{2})$/, '$1,$2')}
            </p>
            <h2 className='mt-5 text-lg font-semibold text-gray-800'>About the job</h2>
            <p className='text-sm text-gray-600 mt-3'>
                {job.description}
            </p>
        </div>
    )
}

export default ViewSingleJobModal
