import React from 'react'

const JobCard = () => {
    return (
        <>
            <div className='flex items-start p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition ease-in-out duration-150 cursor-pointer'>
                <div className='w-12 mr-4'>
                    <img src="https://media.licdn.com/dms/image/v2/D4D0BAQFMlhBqJUS57Q/company-logo_100_100/company-logo_100_100/0/1703137169279/codewinglet_logo?e=1733961600&v=beta&t=jMUeM1RcR7JQm7C5bm6DkH5qvfDTkuUs6LoF1WVGtr8" alt="Company Logo" className='w-full h-full object-contain' />
                </div>
                <div className='flex-1'>
                    <h2 className='font-semibold text-lg text-gray-800'>Junior React JS Developer</h2>
                    <p className='text-sm text-gray-600'>Microsoft</p>
                    <p className='text-xs text-gray-400'>Surat, Gujarat, India (On-site)</p>
                    <p className='text-xs text-gray-600 mt-2'>24 hours ago</p>
                </div>
            </div>
        </>
    )
}

export default JobCard
