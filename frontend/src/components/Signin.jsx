import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Signin = () => {

    useEffect(() => {
        document.title = "PROFLEX Login - Log in to your PROFLEX account";
    }, []);

    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({ name: "", password: "" })
    const [btnLoading, setBtnLoading] = useState(false);
    const url = "http://localhost:9171"; // API URL

    const handleSigninSubmit = async (e) => {
        setBtnLoading(true);
        e.preventDefault();

        if (userDetails.password.length < 8) {
            toast.error("Password length must be 8 characters or longer");
            setBtnLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${url}/userSignin/signin`,
                userDetails, // Form data being sent
                {
                    withCredentials: true, // Include cookies with the request
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    validateStatus: function (status) {
                        // Resolve only if the status code is less than 500
                        return status < 500;
                    }
                }
            );

            if (response.status === 201 && response.data.success) {
                if (response.data.role === 'JobSeeker') {
                    navigate('/');
                } else if (response.data.role === 'Employer') {
                    navigate('/employe-dashboard');
                }
            } else {
                toast.error(response.data.msg || `Error: ${response.status}`);
                setBtnLoading(false);
            }
        } catch (err) {
            console.log(err);
            toast.error('An error occurred. Please try again later.');
            setBtnLoading(false);
        }
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <Toaster />
            <section className='px-3 md:px-0 w-full h-screen'>
                <div className='flex items-center justify-center h-full'>
                    <div className='border rounded-lg p-5 w-[400px]'>
                        <h1 className="text-center text-xl md:text-2xl font-semibold mb-5">Log in to <span className='text-[#14a800] select-none'>PROFLEX</span></h1>
                        <form onSubmit={handleSigninSubmit} autoComplete='off'>
                            <div className='flex items-center border-2 rounded px-2 py-1 mb-5'>
                                <p className='pr-2'><i className="ri-mail-line"></i></p>
                                <input type="email" name='email' onChange={handleFormChange} className='outline-none w-full' placeholder='Email' required autoFocus />
                            </div>
                            <div className='flex items-center border-2 rounded px-2 py-1 mb-5'>
                                <p className='pr-2'><i className="ri-lock-line"></i></p>
                                <input type="password" name='password' onChange={handleFormChange} className='outline-none w-full' placeholder='password' required />
                            </div>
                            <button type='submit' className={`${btnLoading ? 'opacity-70 text-base w-full bg-[#108a00] py-2 rounded-lg font-medium text-white cursor-not-allowed' : 'hover:bg-[#14a800] text-base w-full bg-[#108a00] py-2 rounded-lg font-medium text-white'}`}>
                                {btnLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            ></path>
                                        </svg>
                                        Continue...
                                    </div>
                                ) : (
                                    'Continue'
                                )}
                            </button>
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
