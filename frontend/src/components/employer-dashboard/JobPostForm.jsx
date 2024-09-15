import React, { useState } from "react";

const JobPostForm = () => {
    const [jobPost, setJobPost] = useState({
        title: "Frontend Developer",
        description: "We are looking for a frontend developer proficient in React and CSS.",
        requirements: ["React", "JavaScript", "CSS", "HTML"],
        location: "Remote",
        employmentType: "Full-Time",
        salaryRange: "$70,000 - $90,000",
        postedBy: {
            employerId: "6489b8706f28d2c4b8b9e456",
            companyLogo: "img.jpg",
            companyName: "ACME Corp"
        },
        datePosted: "2024-09-01",
        status: "Active",
        applicants: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRequirementsChange = (e, index) => {
        const updatedRequirements = [...jobPost.requirements];
        updatedRequirements[index] = e.target.value;
        setJobPost((prev) => ({
            ...prev,
            requirements: updatedRequirements,
        }));
    };

    const addRequirement = () => {
        setJobPost((prev) => ({
            ...prev,
            requirements: [...prev.requirements, ""],
        }));
    };

    const removeRequirement = (index) => {
        const updatedRequirements = jobPost.requirements.filter((_, i) => i !== index);
        setJobPost((prev) => ({
            ...prev,
            requirements: updatedRequirements,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Job Post Data:", jobPost);
        // You can send the form data to the server here
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg overflow-y-auto max-h-[80vh] custom-scrollbar">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Job Title</label>
                <input
                    type="text"
                    name="title"
                    value={jobPost.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea
                    name="description"
                    value={jobPost.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Requirements</label>
                {jobPost.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            value={requirement}
                            onChange={(e) => handleRequirementsChange(e, index)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        <button
                            type="button"
                            onClick={() => removeRequirement(index)}
                            className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addRequirement}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                    Add Requirement
                </button>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                <input
                    type="text"
                    name="location"
                    value={jobPost.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Employment Type</label>
                <input
                    type="text"
                    name="employmentType"
                    value={jobPost.employmentType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Salary Range</label>
                <input
                    type="text"
                    name="salaryRange"
                    value={jobPost.salaryRange}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Company Name</label>
                <input
                    type="text"
                    name="companyName"
                    value={jobPost.postedBy.companyName}
                    onChange={(e) => {
                        setJobPost((prev) => ({
                            ...prev,
                            postedBy: {
                                ...prev.postedBy,
                                companyName: e.target.value,
                            },
                        }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Company Logo</label>
                <input
                    type="text"
                    name="companyLogo"
                    value={jobPost.postedBy.companyLogo}
                    onChange={(e) => {
                        setJobPost((prev) => ({
                            ...prev,
                            postedBy: {
                                ...prev.postedBy,
                                companyLogo: e.target.value,
                            },
                        }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                <input
                    type="text"
                    name="status"
                    value={jobPost.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
                Add
            </button>
        </form>
    );
};

export default JobPostForm;