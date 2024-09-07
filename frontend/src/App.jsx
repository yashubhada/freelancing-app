import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from './components/Home';
import Signin from './components/Signin';
import SignupRole from './components/SignupRole';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<SignupRole />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
