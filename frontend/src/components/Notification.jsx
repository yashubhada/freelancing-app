import React from 'react'
import Navbar from './Navbar';

const Notification = () => {

    document.title = "Notification | PROFLEX";

    return (
        <>
            <Navbar />

            <section className="px-3 md:px-0">
                <div className="container mx-auto mt-5">
                    <div className='flex items-center bg-[#f5f5f5] py-2 px-3 border-b cursor-pointer'>
                        <div className='w-16 h-16 mr-5'>
                            <img className='w-full h-full object-cover rounded-full border' src="https://res.cloudinary.com/dfcfncp2q/image/upload/v1727528663/proflex/EmployerProfileImages/n7j54enr0gpfbf9iolfl.png" alt="Company logo" />
                        </div>
                        <p className='text-base font-medium text-gray-600'>Your application was viewed for <span className='font-semibold'>Full-time/Part-time MERN Coach at Explorin</span></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Notification
