import { useState } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const SignupForm = () => {

    const { userRole } = useParams(); // Get the user role (e.g., 'Jobber' or 'employer')
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
    const [jobberDetails, setJobberDetails] = useState({ name: "", email: "", password: "" });
    const [btnLoading, setBtnLoading] = useState(false);

    const url = "http://localhost:9171"; // API URL

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);

        if(jobberDetails.password.length < 8) {
            toast.error("password length must be 8 characters or long");
            setBtnLoading(false);
            return;
        }

        // Check if userRole is 'Jobber'
        if (userRole === 'Jobber') {
            try {
                const response = await axios.post(`${url}/jobber/signup`,
                    jobberDetails, // Form data being sent
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        validateStatus: function (status) {
                            // Resolve only if the status code is less than 500
                            // Allows 4xx responses to be handled in the "then or catch" block
                            return status < 500;
                        }
                    }
                );

                if (response.status === 201 && response.data.success) {
                    navigate('/signin');
                } else {
                    toast.error(response.data.msg || `Error: ${response.status}`);
                    setBtnLoading(false)
                }
            } catch (err) {
                console.log(err);
                toast.error('An error occurred. Please try again later.');
                setBtnLoading(false);
            }
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setJobberDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <Toaster /> {/* For toast notifications */}

            <section className='px-3 md:px-0'>
                <div className='h-screen w-full flex items-center justify-center'>
                    <div>
                        <h1 className='text-center font-medium text-xl md:text-2xl mb-10'>
                            {
                                userRole === 'employer' ? 'Sign up to hire talent' : 'Sign up to find work you love'
                            }
                        </h1>
                        <form className='w-full md:w-[520px]' onSubmit={handleSignupSubmit} autoComplete='off'>
                            {/* Name Input */}
                            <div className='mb-7'>
                                <label className='block mb-2 font-medium text-base'>Full name</label>
                                <input type="text" name='name' onChange={handleFormChange} autoFocus className='outline-none focus:border-gray-500 border-gray-300 border-2 py-2 px-3 rounded-lg w-full' required />
                            </div>
                            {/* Email Input */}
                            <div className='mb-7'>
                                <label className='block mb-2 font-medium text-base'>Email address</label>
                                <input type="email" name='email' onChange={handleFormChange} className='outline-none focus:border-gray-500 border-gray-300 border-2 py-2 px-3 rounded-lg w-full' required />
                            </div>
                            {/* Password Input */}
                            <div className='mb-7 relative'>
                                <label className='block mb-2 font-medium text-base'>Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    onChange={handleFormChange}
                                    className='outline-none focus:border-gray-500 border-gray-300 border-2 py-2 px-3 rounded-lg w-full'
                                    required
                                />
                                <span
                                    className='absolute right-3 top-[37px] cursor-pointer text-gray-500'
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <i className="ri-eye-line text-[24px]"></i> : <i className="ri-eye-off-line text-[24px]"></i>}
                                </span>
                            </div>
                            {/* Submit Button */}
                            <div className="flex justify-center mb-7">
                                <button
                                    type='submit'
                                    className={`${btnLoading ? 'bg-[#108a00] opacity-70 font-medium text-white cursor-not-allowed w-[190px] py-2 rounded-lg focus:outline-none' : 'bg-[#108a00] text-white rounded-lg w-[190px] py-2 font-medium cursor-pointer hover:bg-[#14a800] focus:outline-none'}`}
                                >
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
                                            Creating...
                                        </div>
                                    ) : (
                                        'Create my account'
                                    )}
                                </button>
                            </div>
                            {/* Divider */}
                            <div className='mb-7 relative'>
                                <hr />
                                <p className='bg-white w-fit absolute left-1/2 transform -translate-x-1/2 top-[-10px] px-2'>Or</p>
                            </div>
                            {/* Signin Link */}
                            <p className='text-center font-medium text-sm'>
                                Already have an account? <NavLink to='/signin' className='text-[#14a800] hover:underline'>Log in</NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignupForm;
