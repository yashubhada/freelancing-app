import React from 'react'

function Footer() {

    const date = new Date;
    const currentYear = date.getFullYear();

    return (
        <>
            <footer className="px-3 md:px-0 bg-[#181818]">
                <div className="container mx-auto mt-10">
                    <p className="text-center text-gray-300 font-medium text-base p-5">© {currentYear} PROFLEX Global Inc.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer
