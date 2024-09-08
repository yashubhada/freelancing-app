import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from './components/Home';
import Signin from './components/Signin';
import SignupRole from './components/SignupRole';
import SignUp from './components/SignUp';
import FindFreelancer from './components/FindFreelancer';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signuprole" element={<SignupRole />} />
                <Route path="/signup/:userRole" element={<SignUp />} />
                <Route path="/find-freelancers" element={<FindFreelancer />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
