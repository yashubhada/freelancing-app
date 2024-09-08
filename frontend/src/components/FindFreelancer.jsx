import React, { useState } from 'react';
import Navbar from './Navbar';

const FindFreelancer = () => {

    const skils = [
        'javascript developer',
        'reactjs',
        'python developer',
        'java developer',
        'HTML',
        'CSS',
        'bootsrap'
    ];

    const [userSkill, setUerSkill] = useState([]);
    const [showSkillSearch, setShowSkillSearch] = useState(true);

    const handleChnageSearch = (e) => {
        let word = e.target.value;
        if (word.length != 0) {
            let filteredData = skils.filter(data => data.toLocaleLowerCase().includes(word))
            setUerSkill(filteredData);
            setShowSkillSearch(false)
        } else {
            setShowSkillSearch(true)
        }
    }

    return (
        <>
            <Navbar />

            <section className='px-3 md:px-0'>
                <div className='container mx-auto'>
                    <h1 className='mt-10 font-medium text-lg md:text-3xl text-center text-[#14a800]'>Hire the best Freelancers</h1>
                    <p className='mt-5 mb-10 font-medium text-base text-center text-gray-600'>Check out Freelancers with the skills you need for your next job.</p>
                </div>
            </section>

            {/* Searchbar */}

            <section className='px-3 md:px-0'>
                <div className='container mx-auto'>
                    <div className="flex justify-center">
                        <div className='flex items-center w-full md:w-[500px] border-2 border-gray-300 px-3 py-2 rounded-md relative'>
                            <p className='mr-2 text-lg text-[#14a800]'><i className="ri-search-line"></i></p>
                            <input type="text" placeholder='Search Freelancers' className='outline-none w-full' onChange={handleChnageSearch} />
                            <ul className={`absolute top-[47px] left-0 w-full shadow ${showSkillSearch && 'hidden'}`}>
                                {
                                    userSkill.map((ary, i) => {
                                        return <li className='p-3 hover:bg-gray-50 cursor-pointer font-medium' key={i}><i className="ri-search-line mr-2"></i>{ary}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FindFreelancer
