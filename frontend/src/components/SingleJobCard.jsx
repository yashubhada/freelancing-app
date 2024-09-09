import React from 'react'

const SingleJobCard = () => {
    return (
        <>
            <div className='p-4 border border-gray-200 rounded-lg bg-white'>
                <div className='flex items-center'>
                    <div className='w-14 mr-3'>
                        <img src="https://media.licdn.com/dms/image/v2/D4D0BAQFMlhBqJUS57Q/company-logo_100_100/company-logo_100_100/0/1703137169279/codewinglet_logo?e=1733961600&v=beta&t=jMUeM1RcR7JQm7C5bm6DkH5qvfDTkuUs6LoF1WVGtr8" alt="Company Logo" className='w-full h-full object-contain' />
                    </div>
                    <p className='text-sm font-normal text-gray-700'>Codewinglet Private Limited</p>
                </div>
                <h2 className='text-lg font-semibold text-gray-800 mt-2'>ReactJS Developer</h2>
                <p className='text-xs text-gray-400 mt-1'>Surat, Gujarat, India · 24 hours ago</p>
                <p className='font-medium text-sm text-gray-600 mt-1'>
                    <span className='text-lg mr-2'><i className="ri-briefcase-4-fill"></i></span>On-site · Entry level
                </p>
                <p className='font-medium text-sm text-gray-600 mt-1'>
                    <span className='text-lg mr-2'><i className="ri-list-check-3"></i></span>Skills: Front-End Development, React.js, +8 more
                </p>
                <p className='font-medium text-sm text-gray-600 mt-1'>
                    <span className='text-lg mr-2'><i className="ri-money-rupee-circle-fill"></i></span>Salary Range: 70,000 - 90,000
                </p>
                <button className="mt-5 font-medium text-sm text-white bg-[#108a00] hover:bg-[#14a800] py-2 w-[80px] rounded">
                    Apply
                </button>
                <h2 className='mt-5 text-lg font-semibold text-gray-800'>About the job</h2>
                <p className='text-sm text-gray-600 mt-3'>
                    Proficient in JavaScript, with strong capabilities in DOM manipulation and the JavaScript object model. Thorough understanding of React.js fundamentals and its core principles. Experience with popular React.js workflows such as Redux Toolkit, Flux, and React-Query. Familiarity with data structure libraries like Immutable.js. Bonus: Knowledge of isomorphic React. Understanding of RESTful APIs.
                </p>
            </div>
        </>
    )
}

export default SingleJobCard
