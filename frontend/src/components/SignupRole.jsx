import React, { useEffect, useState } from 'react';
import FreeLancerRoleImg from '../images/freelancerRole.png';
import ClientRoleImg from '../images/clientRole.png';
import { NavLink } from 'react-router-dom';

const SignupRole = () => {
    useEffect(() => {
        document.title = "Sign up for POFLEX | Employer & Jobber Accounts";
    }, []);

    const [selectedRole, setSelectedRole] = useState('');
    const [disabledBtn, setDisabledBtn] = useState(true);

    const handleRoleChange = (role) => {
        setSelectedRole(role);
        setDisabledBtn(false);
    };

    return (
        <>
            <section className='px-3 md:px-0'>
                <div className='h-screen w-full flex items-center justify-center'>
                    <div>
                        <h1 className='text-center font-medium text-xl md:text-2xl mb-10'>Join as a jobber or employer</h1>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 justify-items-center">
                            <div className='hidden md:block'></div>
                            <label
                                className="relative flex items-center justify-between p-6 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-all w-[300px]"
                                onClick={() => handleRoleChange('employer')}
                            >
                                <input type="radio" name="role" className="sr-only peer" />
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                                        <img src={ClientRoleImg} alt="ClientRoleImg" className='w-[25px]' />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">I’m a employer</h3>
                                        <p className="text-sm text-gray-500">Hiring for a company</p>
                                    </div>
                                </div>
                                <span className="absolute top-4 right-4 w-5 h-5 border border-gray-300 rounded-full peer-checked:bg-[#14a800] peer-checked:border-[#14a800] flex items-center justify-center transition-all">
                                    <span className="w-2 h-2 bg-white rounded-full peer-checked:block hidden"></span>
                                </span>
                                <div className="absolute inset-0 border-2 rounded-lg border-transparent peer-checked:border-[#14a800] transition-all"></div>
                            </label>

                            <label
                                className="relative flex items-center justify-between p-6 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-all w-[300px]"
                                onClick={() => handleRoleChange('Jobber')}
                            >
                                <input type="radio" name="role" className="sr-only peer" />
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                                        <img src={FreeLancerRoleImg} alt="FreeLancerRoleImg" className='w-[25px]' />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">I’m a jobber</h3>
                                        <p className="text-sm text-gray-500">Looking for work</p>
                                    </div>
                                </div>
                                <span className="absolute top-4 right-4 w-5 h-5 border border-gray-300 rounded-full peer-checked:bg-[#14a800] peer-checked:border-[#14a800] flex items-center justify-center transition-all">
                                    <span className="w-2 h-2 bg-white rounded-full peer-checked:block hidden"></span>
                                </span>
                                <div className="absolute inset-0 border-2 rounded-lg border-transparent peer-checked:border-[#14a800] transition-all"></div>
                            </label>
                            <div className='hidden md:block'></div>
                        </div>
                        <div className="flex justify-center my-10">
                            <NavLink to={`/signup/${selectedRole}`}>
                                <button
                                    className='bg-[#108a00] text-white rounded-lg px-5 py-2 font-medium cursor-pointer hover:bg-[#14a800] focus:outline-none disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'
                                    disabled={disabledBtn}
                                >
                                    {selectedRole === 'employer' ? 'Join as a employer' : selectedRole === 'Jobber' ? 'Apply as a Jobber' : 'Create Account'}
                                </button>
                            </NavLink>
                        </div>

                        <p className='text-center font-medium text-sm'>
                            Already have an account? <NavLink to='/signin' className='text-[#14a800] hover:underline'>Log In</NavLink>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SignupRole;
