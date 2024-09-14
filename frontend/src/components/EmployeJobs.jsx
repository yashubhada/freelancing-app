import React from 'react'
import NavbarEmp from './NavbarEmp'

const EmployeJobs = () => {
    return (
        <>
            <NavbarEmp />
            
            <section className="px-3 md:px-0 mt-10">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between mb-5">
                        <h1 className='text-lg font-medium'>Existing Jobs</h1>
                        <button className='bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-md'>Add new job</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 shadow-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-200">
                                        Job Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-200">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-200">
                                        Applicants
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-200">
                                        Date Posted
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-200">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-200">
                                        Frontend Developer
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                        Active
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                        5 Applicants
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                        2024-09-01
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border border-gray-200">
                                        <button className="text-blue-600 hover:text-blue-900">Edit</button> |
                                        <button className="text-yellow-500 hover:text-yellow-900">View</button> |
                                        <button className="text-red-600 hover:text-red-900">Deactivate</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-200">
                                        Backend Developer
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                        Inactive
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                        2 Applicants
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-200">
                                        2024-08-25
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border border-gray-200">
                                        <button className="text-blue-600 hover:text-blue-900">Edit</button> |
                                        <button className="text-yellow-500 hover:text-yellow-900">View</button> |
                                        <button className="text-green-600 hover:text-green-900">Activate</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </section>
        </>
    )
}

export default EmployeJobs
