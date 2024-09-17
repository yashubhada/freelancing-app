import React, { useEffect } from 'react'
import NavbarEmp from './NavbarEmp'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployerDashboard = () => {

    document.title = "Employer dashboard | Home";
    const navigate = useNavigate();

    const url = "http://localhost:9171"; // API URL

    const isEmployeSignin = async () => {
        try {
            const response = await axios.get(`${url}/employer/userTokenVerify`, {
                withCredentials: true,
            });
            console.log('Dashboard Data:', response.data);
            if(response.data.user.role !== "Employer") {
                navigate('/signin');
            }
        } catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                // Redirect to login if not authenticated
                navigate('/signin');
            } else {
                console.error('Error fetching dashboard:', error.response?.data || error.message);
            }
        }
    };

    useEffect(() => {
        isEmployeSignin();
    }, []);

    return (
        <>
            <NavbarEmp />

            <section className="px-3 md:px-0 mt-10">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold">Total Job Posts</h2>
                            <p className="mt-3 text-3xl font-bold">25</p>
                            <p className="mt-2">Active Listings</p>
                        </div>

                        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold">Total Applicants</h2>
                            <p className="mt-3 text-3xl font-bold">150</p>
                            <p className="mt-2">Candidates Applied</p>
                        </div>

                        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold">New Applications</h2>
                            <p className="mt-3 text-3xl font-bold">12</p>
                            <p className="mt-2">In Last 24 Hours</p>
                        </div>

                        <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold">Pending Reviews</h2>
                            <p className="mt-3 text-3xl font-bold">8</p>
                            <p className="mt-2">Applications to Review</p>
                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}

export default EmployerDashboard
