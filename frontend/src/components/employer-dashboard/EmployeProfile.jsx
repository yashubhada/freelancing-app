import React, { useContext, useEffect, useReducer, useState } from 'react'
import NavbarEmp from './NavbarEmp'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeProfile = () => {

    const { fetchEmployerInfo, EmployerProfileInfo, ItSkillsArray } = useContext(AppContext);

    const navigate = useNavigate();

    const url = "http://localhost:9171"; // API URL
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    const isEmployeSignin = async () => {
        try {
            const response = await axios.get(`${url}/employer/userTokenVerify`, {
                withCredentials: true,
            });
            setUserId(response.data.user.userId);
            fetchEmployerInfo(response.data.user.userId);
            if (response.data.user.role !== "Employer") {
                navigate('/signin');
            }
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate('/signin');
            } else {
                console.error('Error fetching dashboard:', error.response?.data || error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        isEmployeSignin();
    }, []);

    const {
        name = "",
        email = "",
        profileImage = "",
        profile = { companyName: "", bio: "", industry: "", website: "", location: "", }
    } = EmployerProfileInfo || {};

    const [isEditProfile, setIsEditProfile] = useState(false);
    const [isEditCompanyInfo, setIsEditCompanyInfo] = useState(false);

    const initialState = {
        name: "",
        email: "",
        profileImage: "",
        profile: { companyName: "", bio: "", industry: "", website: "", location: "", }
    }

    const reducer = (state, action) => {

    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            <NavbarEmp />

            {/* employe information */}
            <section className="px-3 md:px-0 mt-10">
                <div className="container mx-auto">
                    <div className="p-5 bg-white rounded-lg border relative">
                        <h1 className='mb-5 text-lg font-medium'>Employer Profile</h1>
                        <div>
                            <div className="block md:flex items-center">
                                <div className='flex justify-center mb-5 md:mb-0 md:block'>
                                    <img
                                        src=""
                                        // alt={`${}'s profile`}
                                        className="w-32 h-32 rounded-full object-cover border border-gray-200"
                                    />
                                </div>
                                <div className="md:ml-6 text-center md:text-left">
                                    <h1 className="text-2xl font-semibold">{name || "No name available"}</h1>
                                    <p className="text-gray-600">{email || "No email available"}</p>
                                </div>
                            </div>
                            <div className='absolute top-1 right-1 hover:bg-gray-100 w-10 h-10 text-center rounded-full cursor-pointer'>
                                <i className="ri-pencil-fill text-2xl leading-10"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EmployeProfile
