import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';

const Search = () => {

    document.title = "Search | PROFLEX";

    const url = "http://localhost:9171"; // API URL

    const [jobberInfo, setJobberInfo] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const fetchAllJobbers = async () => {
        try {
            const response = await axios.post(`${url}/jobber/fetchAllJobbers`);
            setJobberInfo(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        const filteredData = jobberInfo.filter((jobber) => {
            return value.split(' ').every((word) =>
                jobber.name.toLowerCase().includes(word.toLowerCase())
            );
        });
        setSearchResult(filteredData);
    };

    useEffect(() => {
        fetchAllJobbers();
    }, []);

    return (
        <>
            <Navbar />
            <section className="px-3 md:px-0">
                <div className="container mx-auto w-full md:w-2/5 mt-5">
                    <div className="flex w-full bg-white border items-center rounded-full px-3 py-2">
                        <i className='ri-search-line text-base mr-3'></i>
                        <input 
                            value={searchValue} 
                            onChange={handleSearchChange} 
                            type="text" 
                            className="w-full outline-none" 
                            placeholder="Search peoples..." 
                        />
                    </div>
                    {
                        searchResult && searchResult.length > 0 ? (
                            <ul className="w-full mt-2">
                                {searchResult.map((ary, i) => (
                                    <li 
                                        key={i} 
                                        className="flex items-center py-2 px-2 cursor-pointer hover:bg-[#f0f0f0] rounded"
                                    >
                                        <div className='flex items-center'>
                                            <div className='w-10 h-10'>
                                                <img 
                                                    src={ary.profileImage} 
                                                    alt="User profile image" 
                                                    className='w-full h-full object-cover border rounded-full' 
                                                />
                                            </div>
                                            <p className="text-base ml-3">{ary.name}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            searchValue && (
                                <p className='text-sm text-center text-red-600 mt-10'>Not found</p>
                            )
                        )
                    }
                </div>
            </section>
        </>
    );    
}

export default Search
