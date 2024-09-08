import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const SignupForm = () => {

    const { userRole } = useParams();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className='px-3 md:px-0'>
            <div className='h-screen w-full flex items-center justify-center'>
                <div>
                    <h1 className='text-center font-medium text-xl md:text-2xl mb-10'>
                        {
                            userRole === 'client' ? 'Sign up to hire talent' : 'Sign up to find work you love'
                        }
                    </h1>
                    <form className='w-full md:w-[520px]'>
                        <div className='grid grid-cols-2 gap-4 md:gap-5 mb-7'>
                            <div>
                                <label className='block mb-2 font-medium text-base'>First name</label>
                                <input type="text" className='outline-none border-gray-300 border-2 py-2 px-3 rounded-lg w-full' required />
                            </div>
                            <div>
                                <label className='block mb-2 font-medium text-base'>Last name</label>
                                <input type="text" className='outline-none border-gray-300 border-2 py-2 px-3 rounded-lg w-full' required />
                            </div>
                        </div>
                        <div className='mb-7'>
                            <label className='block mb-2 font-medium text-base'>Email address</label>
                            <input type="email" className='outline-none border-gray-300 border-2 py-2 px-3 rounded-lg w-full' required />
                        </div>
                        <div className='mb-7 relative'>
                            <label className='block mb-2 font-medium text-base'>Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className='outline-none border-gray-300 border-2 py-2 px-3 rounded-lg w-full'
                                required
                            />
                            <span
                                className='absolute right-3 top-[37px] cursor-pointer text-gray-500'
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <i className="ri-eye-line text-[24px]"></i> : <i className="ri-eye-off-line text-[24px]"></i>}
                            </span>
                        </div>
                        <div className="flex justify-center mb-7">
                            <button type='submit' className='bg-[#108a00] text-white rounded-lg px-5 py-2 font-medium cursor-pointer hover:bg-[#14a800] focus:outline-none disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'>
                                Create my account
                            </button>
                        </div>
                        <div className='mb-7 relative'>
                            <hr />
                            <p className='bg-white w-fit absolute left-1/2 transform -translate-x-1/2 top-[-10px] px-2'>Or</p>
                        </div>
                        <p className='text-center font-medium text-sm'>
                            Already have an account? <NavLink to='/signin' className='text-[#14a800] hover:underline'>Log in</NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignupForm;
