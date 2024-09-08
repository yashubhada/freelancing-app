import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Signin = () => {

    useEffect(()=>{
        document.title = "PROFLEX Login - Log in to your PROFLEX account";
    },[]);

    return (
        <>
            <section className='px-3 md:px-0 w-full h-screen'>
                <div className='flex items-center justify-center h-full'>
                    <div className='border rounded-lg p-5 w-[400px]'>
                        <h1 className="text-center text-xl md:text-2xl font-semibold mb-5">Log in to <span className='text-[#14a800] select-none'>PROFLEX</span></h1>
                        <form action="">
                            <div className='flex items-center border-2 rounded px-2 py-1 mb-5'>
                                <p className='pr-2'><i className="ri-mail-line"></i></p>
                                <input type="text" className='outline-none w-full' placeholder='Email' />
                            </div>
                            <button className='text-base w-full bg-[#108a00] hover:bg-[#14a800] py-2 rounded-lg font-medium text-white'>Continue</button>
                        </form>
                        <div className='my-5 relative'>
                            <hr />
                            <p className='bg-white w-fit absolute left-1/2 transform -translate-x-1/2 top-[-10px] px-2'>Or</p>
                        </div>
                        <p className='text-center font-medium text-sm'>
                            Don't have an account? Let's <NavLink to='/signuprole' className='text-[#14a800] hover:underline'>Sign up</NavLink>
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signin
