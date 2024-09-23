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
import FindJobbers from './components/FindJobbers';
import FindJob from './components/FindJob';
import JobSeekerProfile from './components/JobSeekerProfile';
import EmployerDashboard from './components/employer-dashboard/EmployerDashboard';
import EmployeJobs from './components/employer-dashboard/EmployeJobs';
import EmployeProfile from './components/employer-dashboard/EmployeProfile';

const App = () => {
    const profileData = {
        _id: '6489b8706f28d2c4b8b9e123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        profileImage: 'img.jpg',
        profile: {
            headline: 'Full Stack Developer',
            bio: 'I am a full stack developer with experience in JavaScript, React, Node.js, and MongoDB.',
            skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
            experience: [
                {
                    jobTitle: 'Software Engineer',
                    company: 'Tech Solutions',
                    startDate: '2021-01-01',
                    endDate: 'Present',
                    description: 'Developed and maintained web applications.',
                },
            ],
            education: [
                {
                    institution: 'University of XYZ',
                    degree: 'Bachelor of Computer Science',
                    year: '2020',
                },
            ],
            resumeUrl: 'https://example.com/john-resume.pdf',
        },
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signuprole" element={<SignupRole />} />
                <Route path="/signup/:userRole" element={<SignUp />} />
                <Route path="/find-talent" element={<FindJobbers />} />
                <Route path="/find-job" element={<FindJob />} />
                <Route path="/profile" element={<JobSeekerProfile profileData={profileData} />} />
                {/* Employer Routes */}
                <Route path="/employe-dashboard" element={<EmployerDashboard />} />
                <Route path="/employe-jobs" element={<EmployeJobs />} />
                <Route path="/employe-profile" element={<EmployeProfile />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
