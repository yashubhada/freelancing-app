import React, { useContext, useEffect, useReducer, useState } from 'react';
import NavbarEmp from './NavbarEmp';
import PegeLoader from '../PageLoader';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const EmployeProfile = () => {
    document.title = "Employer Dashboard | Profile";

    const { fetchEmployerInfo, EmployerProfileInfo } = useContext(AppContext);
    const navigate = useNavigate();
    const url = "http://localhost:9171";

    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingProfile, setLoadingProfile] = useState(true);

    const isEmployeSignin = async () => {
        try {
            const response = await axios.get(`${url}/employer/userTokenVerify`, { withCredentials: true });
            setUserId(response.data.user.userId);
            await fetchEmployerInfo(response.data.user.userId);

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

    // Set profile info once it is available
    useEffect(() => {
        if (EmployerProfileInfo) {
            dispatch({ type: 'SET_INITIAL_PROFILE', payload: EmployerProfileInfo });
            setLoadingProfile(false);
        }
    }, [EmployerProfileInfo]);

    const initialState = {
        name: "",
        email: "",
        profileImage: "",
        profile: {
            companyName: "",
            companyLogoImg: "",
            bio: "",
            industry: "",
            website: "",
            location: ""
        }
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_INITIAL_PROFILE':
                return {
                    ...state,
                    name: action.payload.name || "",
                    email: action.payload.email || "",
                    profileImage: action.payload.profileImage || "",
                    profile: {
                        companyName: action.payload.profile?.companyName || "",
                        companyLogoImg: action.payload.profile?.companyLogoImg || "",
                        bio: action.payload.profile?.bio || "",
                        industry: action.payload.profile?.industry || "",
                        website: action.payload.profile?.website || "",
                        location: action.payload.profile?.location || "",
                    }
                };
            case 'SET_NAME':
                return { ...state, name: action.payload };
            case 'SET_EMAIL':
                return { ...state, email: action.payload };
            case 'SET_PROFILE_IMAGE':
                return { ...state, profileImage: action.payload };
            case 'SET_COMPANY_INFO':
                return {
                    ...state,
                    profile: { ...state.profile, [action.field]: action.payload }
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const [isEditProfile, setIsEditProfile] = useState(false);
    const [isEditCompanyInfo, setIsEditCompanyInfo] = useState(false);

    const handleEditProfile = () => setIsEditProfile(!isEditProfile);
    const handleEditCompanyInfo = () => setIsEditCompanyInfo(!isEditCompanyInfo);

    const [previewImage, setPreviewImage] = useState();
    const [btnLoading, setBtnLoading] = useState(false);

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setBtnLoading(true);
        const data = new FormData();
        data.append('userId', userId);
        data.append('profileImage', state.profileImage);
        data.append('name', state.name);
        try {
            const response = await axios.put(`${url}/employer/updateEmpProfile/profile`, data);
            toast.success(response.data.msg);
            fetchEmployerInfo(userId);
            setIsEditProfile(false);
        } catch (error) {
            console.error('Error updating profile:', error.response?.data || error.message);
        } finally {
            setBtnLoading(false);
        }
    };

    const handleSaveCompanyInfo = async (e) => {
        e.preventDefault();
        setBtnLoading(true);

        const data = new FormData();
        data.append('userId', userId);
        data.append('companyName', state.profile.companyName);
        data.append('companyLogoImg', state.profile.companyLogoImg);
        data.append('bio', state.profile.bio);
        data.append('industry', state.profile.industry);
        data.append('website', state.profile.website);
        data.append('location', state.profile.location);

        try {
            const response = await axios.put(`${url}/employer/updateEmpProfile/companyInfo`, data);
            toast.success(response.data.msg);
            fetchEmployerInfo(userId);
            setIsEditCompanyInfo(false);
        } catch (err) {
            console.log(err.message);
        } finally {
            setBtnLoading(false);
        }
    };

    if (loading || loadingProfile) return <PegeLoader />;

    return (
        <>
            <Toaster />
            <NavbarEmp />
            <section className="px-3 md:px-0 mt-10">
                {/* Employer information */}
                <div className="container mx-auto">
                    <div className="p-5 bg-white rounded-lg border relative">
                        <h1 className='mb-5 text-lg font-medium'>Employer Profile</h1>
                        <div className="block md:flex items-center">
                            {
                                isEditProfile ?
                                    <form onSubmit={handleSaveProfile} autoComplete='off' className='w-full'>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                            <div>
                                                <label className='mb-1 block'>Name</label>
                                                <input
                                                    type="text"
                                                    value={state.name}
                                                    onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
                                                    className='w-full px-3 py-1 border rounded focus:outline-indigo-500' required
                                                />
                                            </div>
                                            <div>
                                                <label className='mb-1 block'>Profile Image</label>
                                                <input
                                                    type="file"
                                                    name="profileImage"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        dispatch({ type: 'SET_PROFILE_IMAGE', payload: file });
                                                        if (file) {
                                                            const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                                                            if (!validTypes.includes(file.type)) {
                                                                toast.error('Please upload a valid image file (jpg, jpeg, png)');
                                                                return;
                                                            }
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setPreviewImage(reader.result);
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 focus:outline-none"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {/* Image preview */}
                                        {previewImage && (
                                            <div className="flex justify-center mt-5 md:mb-0 md:block w-32 h-32 rounded-full overflow-hidden">
                                                <img
                                                    src={previewImage}
                                                    alt={`${state.name}'s profile`}
                                                    className="w-full h-full object-cover border border-gray-200"
                                                />
                                            </div>
                                        )}
                                        <button type='submit' className='mt-5 flex justify-center font-medium text-sm w-20 py-2 bg-indigo-600 text-white rounded disabled:opacity-70' disabled={btnLoading}>
                                            {
                                                btnLoading
                                                    ?
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
                                                    :
                                                    "Update"
                                            }
                                        </button>
                                    </form>
                                    :
                                    <>
                                        <div className='flex justify-center mb-5 md:mb-0 md:block'>
                                            <img
                                                src={state.profileImage}
                                                alt={`${state.name}'s profile`}
                                                className="w-32 h-32 rounded-full object-cover border border-gray-200"
                                            />
                                        </div>
                                        <div className="md:ml-6 text-center md:text-left">
                                            <h1 className="text-2xl font-semibold">{state.name || "No name available"}</h1>
                                            <p className="text-gray-600">{state.email || "No email available"}</p>
                                        </div>
                                    </>
                            }
                            <div
                                className='absolute top-1 right-1 hover:bg-gray-100 w-10 h-10 text-center rounded-full cursor-pointer'
                                onClick={handleEditProfile}
                            >
                                <i className="ri-pencil-fill text-2xl leading-10"></i>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Company information */}
                <div className="container mx-auto mt-5">
                    <div className="p-5 bg-white rounded-lg border relative">
                        <h1 className='mb-5 text-lg font-medium'>Company Information</h1>
                        <div className="block md:flex items-center">
                            {
                                isEditCompanyInfo ?
                                    <form onSubmit={handleSaveCompanyInfo} autoComplete='off' className='w-full'>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                            <div>
                                                <label className='mb-1 block'>Company name</label>
                                                <input
                                                    type="text"
                                                    value={state.profile.companyName}
                                                    onChange={(e) => dispatch({ type: 'SET_COMPANY_INFO', field: 'companyName', payload: e.target.value })}
                                                    className='w-full px-3 py-1 border rounded focus:outline-indigo-500' required
                                                />
                                            </div>
                                            <div>
                                                <label className='mb-1 block'>Company bio</label>
                                                <input
                                                    type="text"
                                                    value={state.profile.bio}
                                                    onChange={(e) => dispatch({ type: 'SET_COMPANY_INFO', field: 'bio', payload: e.target.value })}
                                                    className='w-full px-3 py-1 border rounded focus:outline-indigo-500' required
                                                />
                                            </div>
                                            <div>
                                                <label className='mb-1 block'>Company industry</label>
                                                <input
                                                    type="text"
                                                    value={state.profile.industry}
                                                    onChange={(e) => dispatch({ type: 'SET_COMPANY_INFO', field: 'industry', payload: e.target.value })}
                                                    className='w-full px-3 py-1 border rounded focus:outline-indigo-500' required
                                                />
                                            </div>
                                            <div>
                                                <label className='mb-1 block'>Company website</label>
                                                <input
                                                    type="text"
                                                    placeholder='https://www.example.com'
                                                    value={state.profile.website}
                                                    onChange={(e) => dispatch({ type: 'SET_COMPANY_INFO', field: 'website', payload: e.target.value })}
                                                    className='w-full px-3 py-1 border rounded focus:outline-indigo-500' required
                                                />
                                            </div>
                                            <div>
                                                <label className='mb-1 block'>Company location</label>
                                                <input
                                                    type="text"
                                                    value={state.profile.location}
                                                    onChange={(e) => dispatch({ type: 'SET_COMPANY_INFO', field: 'location', payload: e.target.value })}
                                                    className='w-full px-3 py-1 border rounded focus:outline-indigo-500' required
                                                />
                                            </div>
                                            <div>
                                                <label className='mb-1 block'>Profile Image</label>
                                                <input
                                                    type="file"
                                                    name="profileImage"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        dispatch({ type: 'SET_COMPANY_INFO', field: 'companyLogoImg', payload: file });
                                                        if (file) {
                                                            const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                                                            if (!validTypes.includes(file.type)) {
                                                                toast.error('Please upload a valid image file (jpg, jpeg, png)');
                                                                return;
                                                            }
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setPreviewImage(reader.result);
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 focus:outline-none"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {/* Image preview */}
                                        {previewImage && (
                                            <div className="flex justify-center mt-5 md:mb-0 md:block w-32 h-32 rounded-full overflow-hidden">
                                                <img
                                                    src={previewImage}
                                                    alt={`${state.name}'s profile`}
                                                    className="w-full h-full object-cover border border-gray-200"
                                                />
                                            </div>
                                        )}
                                        <button type='submit' className='mt-5 flex justify-center font-medium text-sm w-20 py-2 bg-indigo-600 text-white rounded disabled:opacity-70' disabled={btnLoading}>
                                            {
                                                btnLoading
                                                    ?
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
                                                    :
                                                    "Update"
                                            }
                                        </button>
                                    </form>
                                    :
                                    <>
                                        <div className='flex justify-center mb-5 md:mb-0 md:block'>
                                            <img
                                                src={state.profile.companyLogoImg}
                                                alt={`${state.profile.companyName}'s Logo`}
                                                className="w-32 h-32 rounded-full object-cover border border-gray-200"
                                            />
                                        </div>
                                        <div className="md:ml-6 text-center md:text-left">
                                            <h1 className="text-2xl font-semibold">{state.profile.companyName || "No name available"}</h1>
                                            <p className="text-gray-600">{state.profile.bio || "No bio available"}</p>
                                            <p className="text-gray-600 text-sm mt-3">{state.profile.industry || "No industry available"}</p>
                                            <p className="text-gray-600 text-sm"><i className="mr-2 ri-map-pin-line"></i><span>{state.profile.location || "No Location available"}</span></p>
                                            <a href={state.profile.website} target='_blank' className="text-sm mt-3 text-blue-600 hover:underline">{state.profile.website || "No website available"}</a>
                                        </div>
                                    </>
                            }
                            <div
                                className='absolute top-1 right-1 hover:bg-gray-100 w-10 h-10 text-center rounded-full cursor-pointer'
                                onClick={handleEditCompanyInfo}
                            >
                                <i className="ri-pencil-fill text-2xl leading-10"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default EmployeProfile
