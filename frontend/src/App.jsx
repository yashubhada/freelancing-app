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
import FindJob from './components/FindJob';
import JobSeekerProfile from './components/JobSeekerProfile';
import EmployerDashboard from './components/employer-dashboard/EmployerDashboard';
import EmployeJobs from './components/employer-dashboard/EmployeJobs';
import EmployeProfile from './components/employer-dashboard/EmployeProfile';
import EmployeApplicants from './components/employer-dashboard/EmployeApplicants';
import Notification from './components/Notification';
import Search from './components/Search';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signuprole" element={<SignupRole />} />
                <Route path="/signup/:userRole" element={<SignUp />} />
                <Route path="/find-job" element={<FindJob />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/profile" element={<JobSeekerProfile />} />
                <Route path="/search" element={<Search />} />
                {/* Employer Routes */}
                <Route path="/employe-dashboard" element={<EmployerDashboard />} />
                <Route path="/employe-jobs" element={<EmployeJobs />} />
                <Route path="/employe-profile" element={<EmployeProfile />} />
                <Route path="/employe-applicants" element={<EmployeApplicants />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
