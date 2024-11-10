import React, { useContext, useEffect, useReducer, useState } from "react";
import { AppContext } from "../context/AppContext";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

const JobPostForm = ({ onClose, isEmployeSignin }) => {

    const [btnLoading, setBtnLoading] = useState(false);
    const [employerId, setEmployerId] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setEmployerId(decoded.userId);
        }
    }, []);

    const url = "http://localhost:9171"; // API URL

    const { ItSkillsArray } = useContext(AppContext);
    const [newRequirement, setNewRequirement] = useState("");
    const [filteredSkills, setFilteredSkills] = useState([]);

    const [locationType, setLocationType] = useState("");
    const [officeAddress, setOfficeAddress] = useState("");

    const initialState = {
        title: "",
        description: "",
        requirements: [],
        location: "",
        employmentType: "Full-Time",
        salaryRange: {
            min: "",
            max: ""
        },
        status: "Active",
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_TITLE':
                return { ...state, title: action.payload };
            case 'SET_DESCRIPTION':
                return { ...state, description: action.payload };
            case 'SET_REQUIREMENTS':
                return { ...state, requirements: [...state.requirements, action.payload] };
            case 'REMOVE_REQUIREMENT':
                return {
                    ...state,
                    requirements: state.requirements.filter(req => req !== action.payload)
                };
            case 'SET_LOCATION':
                return { ...state, location: action.payload };
            case 'SET_EMPLOYMENT_TYPE':
                return { ...state, employmentType: action.payload };
            case 'SET_SALARY':
                return {
                    ...state,
                    salaryRange: { ...state.salaryRange, [action.payload.field]: action.payload.value }
                };
            case 'SET_STATUS':
                return { ...state, status: action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleAddRequirement = (skill) => {
        if (skill.trim() && !state.requirements.includes(skill)) {
            dispatch({ type: 'SET_REQUIREMENTS', payload: skill });
            setNewRequirement("");
            setFilteredSkills([]);
        }
    };

    const handleRemoveRequirement = (requirement) => {
        dispatch({ type: 'REMOVE_REQUIREMENT', payload: requirement });
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        setNewRequirement(input);
        if (input) {
            const suggestions = ItSkillsArray.filter(skill =>
                skill.toLowerCase().includes(input.toLowerCase())
            );
            setFilteredSkills(suggestions);
        } else {
            setFilteredSkills([]);
        }
    };

    const handleSelectSkill = (skill) => {
        // handleAddRequirement(skill);
        setNewRequirement(skill);
        setFilteredSkills([]);
    };


    const handleLocationChange = (e) => {
        const selectedLocation = e.target.value;
        setLocationType(selectedLocation);

        if (selectedLocation === "Remote") {
            dispatch({ type: 'SET_LOCATION', payload: "Remote" });
        } else {
            dispatch({ type: 'SET_LOCATION', payload: officeAddress });
        }
    };

    const handleOfficeAddressChange = (e) => {
        const address = e.target.value;
        setOfficeAddress(address);
        if (locationType === "Office") {
            dispatch({ type: 'SET_LOCATION', payload: address });
        }
    };


    const handleEmploymentTypeChange = (e) => {
        const employmentType = e.target.value;
        dispatch({ type: 'SET_EMPLOYMENT_TYPE', payload: employmentType });
    };

    const handleSalaryChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'SET_SALARY', payload: { field: name, value } });
    };


    const handleSubimitNewJobPost = async (e) => {
        console.log('state', state);
        e.preventDefault();
        setBtnLoading(true);
        try {
            const response = await axios.post(`${url}/jobPost/newJobPost`, {
                title: state.title,
                description: state.description,
                requirements: state.requirements,
                location: state.location,
                employmentType: state.employmentType,
                minSalary: state.salaryRange.min,
                maxSalary: state.salaryRange.max,
                employerId,
                status: state.status,
            });
            onClose(); // props function
            isEmployeSignin(); // props function
        } catch (err) {
            console.error('job',err.message);
        } finally {
            setBtnLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubimitNewJobPost} className="p-6 bg-white rounded-lg overflow-y-auto max-h-[80vh]">
                {/* Job Title */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        value={state.title}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-indigo-500"
                        onChange={(e) => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
                        autoComplete="off"
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                        name="description"
                        value={state.description}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-indigo-500"
                        onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })}
                        autoComplete="off"
                        required
                    />
                </div>

                {/* Requirements */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Requirements</label>
                    <div className="relative flex items-center w-full px-3 py-2 border border-gray-300 rounded focus-within:border-indigo-500">
                        <input
                            type="text"
                            className="w-full outline-none"
                            value={newRequirement}
                            onChange={handleInputChange}
                            placeholder="Type a skill..."
                        />
                        <button
                            type="button"
                            onClick={() => handleAddRequirement(newRequirement)}
                            className="absolute right-2 bg-[#108a00] hover:bg-[#14a800] text-white rounded-full h-7 w-7">
                            <i className="ri-add-line text-lg"></i>
                        </button>

                        {/* Skill suggestions */}
                        {filteredSkills.length > 0 && (
                            <div className="absolute top-[42px] left-0 z-10 bg-white border border-gray-200 rounded shadow-md w-full max-h-40 overflow-y-auto">
                                {filteredSkills.map((suggestedSkill, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleSelectSkill(suggestedSkill)}
                                    >
                                        {suggestedSkill}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Display selected requirements */}
                    <div className="flex flex-wrap gap-2 mt-3">
                        {state.requirements.map((requirement, index) => (
                            <p key={index} className="bg-[#108a00] text-white px-2 py-1 rounded-lg text-sm flex items-center">
                                {requirement}
                                <span
                                    className="ml-2 cursor-pointer"
                                    onClick={() => handleRemoveRequirement(requirement)}
                                >
                                    <i className="text-base ri-close-line"></i>
                                </span>
                            </p>
                        ))}
                    </div>
                </div>
                {/* Location */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                    <div className="flex gap-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="locationType"
                                value="Remote"
                                checked={locationType === "Remote"}
                                onChange={handleLocationChange}
                                required
                            />
                            <span className="ml-2">Remote</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="locationType"
                                value="Office"
                                checked={locationType === "Office"}
                                onChange={handleLocationChange}
                                required
                            />
                            <span className="ml-2">Office Address</span>
                        </label>
                    </div>

                    {/* Office Address Input */}
                    {locationType === "Office" && (
                        <div className="mt-3">
                            <input
                                type="text"
                                name="officeAddress"
                                value={officeAddress}
                                onChange={handleOfficeAddressChange}
                                placeholder="Enter office address"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-indigo-500"
                                autoComplete="off"
                                required
                            />
                        </div>
                    )}
                </div>

                {/* Employment Type */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Employment Type</label>
                    <div className="relative">
                        <select
                            name="employmentType"
                            value={state.employmentType}
                            onChange={handleEmploymentTypeChange}
                            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded focus:outline-indigo-500"
                        >
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Internship">Internship</option>
                        </select>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <i className="ri-arrow-down-s-line text-lg text-gray-400"></i>
                        </span>
                    </div>
                </div>

                {/* Salary Range */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Salary Range</label>
                    <div className="flex gap-4">
                        {/* Minimum Salary */}
                        <div className="flex-1">
                            <input
                                type="number"
                                name="min"
                                placeholder="Min Salary"
                                value={state.salaryRange.min}
                                onChange={handleSalaryChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-indigo-500"
                                autoComplete="off"
                                required
                            />
                        </div>

                        {/* Maximum Salary */}
                        <div className="flex-1">
                            <input
                                type="number"
                                name="max"
                                placeholder="Max Salary"
                                value={state.salaryRange.max}
                                onChange={handleSalaryChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-indigo-500"
                                autoComplete="off"
                                required
                            />
                        </div>
                    </div>
                </div>


                {/* Status */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                    <div className="relative">
                        <select
                            name="status"
                            value={state.status}
                            onChange={(e) => dispatch({ type: 'SET_STATUS', payload: e.target.value })}
                            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded focus:outline-indigo-500"
                        >
                            <option value="Active">Active</option>
                            <option value="Deactivate">Deactivate</option>
                        </select>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <i className="ri-arrow-down-s-line text-lg text-gray-400"></i>
                        </span>
                    </div>
                </div>


                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full flex justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none disabled:opacity-65 "
                    disabled={btnLoading}
                >
                    {
                        btnLoading ?
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                            "Add"
                    }
                </button>
            </form>
        </>
    );
};

export default JobPostForm;
