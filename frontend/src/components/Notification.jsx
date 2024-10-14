import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Notification = () => {

    document.title = "Notification | PROFLEX";

    const [jobberId, setJobberId] = useState();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const cookieToken = Cookies.get('token');
        if (cookieToken) {
            const decoded = jwtDecode(cookieToken);
            setJobberId(decoded.userId);
        }
    }, []);

    const url = "http://localhost:9171"; // API URL

    const fetchAllNotification = async () => {
        try {
            const response = await axios.post(`${url}/notification/fetchUserNotifications/${jobberId}`);
            setNotifications(response.data.notification);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        if (jobberId) {
            fetchAllNotification();
        }
    }, [jobberId]);

    return (
        <>
            <Navbar />

            <section className="px-3 md:px-0">
                <div className="container mx-auto mt-5">
                    {
                        notifications.length > 0
                            ?
                            notifications.map((ary, i) => {
                                return (
                                    <div key={i} className='flex items-center bg-[#f5f5f5] py-2 px-3 border-b cursor-pointer'>
                                        <div className='w-16 h-16 mr-5'>
                                            <img className='w-full h-full object-cover rounded-full border' src={ary.companyImage} alt={ary.companyName} />
                                        </div>
                                        <p className='text-base font-medium text-gray-600'>Your application was viewed for <span className='font-semibold'>{ary.message}</span></p>
                                    </div>
                                )
                            })
                            :
                            <p className='text-center text-sm font-medium text-red-500'>No any notification</p>
                    }
                </div>
            </section>
        </>
    )
}

export default Notification
