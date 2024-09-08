import React from 'react'
import UserDefaultProfile from '../images/userProfileImage.png';

const JobberCard = () => {
    return (
        <>
            <div className='border border-gray-400 p-5 rounded-xl'>
                <div className='flex justify-center'>
                    <div className='h-32 w-32 border rounded-full'>
                        <img src={UserDefaultProfile} alt="User profile Image" className='w-full h-full rounded-full object-cover' />
                    </div>
                </div>
                <h1 className='text-center font-medium text-xl mt-5'>Yash Ubhada</h1>
                <p className='text-base font-medium text-center text-gray-600 mt-1'>Experience: <span>2</span> years</p>
                <div className="flex justify-center flex-wrap gap-2 mt-5">
                    <p className="bg-gray-200 px-2 py-1 rounded-lg text-sm">Javascript</p>
                    <p className="bg-gray-200 px-2 py-1 rounded-lg text-sm">ReactJs</p>
                    <p className="bg-gray-200 px-2 py-1 rounded-lg text-sm">NodeJs</p>
                    <p className="bg-gray-200 px-2 py-1 rounded-lg text-sm">MongoDB</p>
                    <p className="bg-gray-200 px-2 py-1 rounded-lg text-sm">MERN stack</p>
                </div>
                <div className="flex justify-center mt-10">
                    <button className='text-base bg-[#108a00] hover:bg-[#14a800] py-2 px-3 rounded-lg font-medium text-white'>See Profile</button>
                </div>
            </div>
        </>
    )
}

export default JobberCard
