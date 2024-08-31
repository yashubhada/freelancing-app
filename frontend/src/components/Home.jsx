import React from "react";
import Logo from '../images/logo-light.png';

const Home = () => {
    return(
        <>
            <section className="bg-[url('./images/hero-img.jpg')] bg-cover w-full h-[40vh] flex items-center justify-center">
                <img src={Logo} alt="Logo" draggable={false} className="w-32" />
            </section>
        </>
    );
}

export default Home;