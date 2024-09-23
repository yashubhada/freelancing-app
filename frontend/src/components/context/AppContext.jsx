import { createContext, useState, useMemo } from "react";
import axios from "axios";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const url = "http://localhost:9171"; // API URL

    const [JobberProfileInfo, setJobberProfileInfo] = useState({});
    const [EmployerProfileInfo, setEmployerProfileInfo] = useState({});

    const fetchJobberInfo = async (id) => {
        try {
            const response = await axios.post(`${url}/jobber/findSingleJobber/${id}`);
            setJobberProfileInfo(response.data.jobber);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchEmployerInfo = async (id) => {
        try {
            const response = await axios.post(`${url}/employer/fetchSingleEmploye/${id}`);
            setEmployerProfileInfo(response.data.jobber);
        } catch (err) {
            console.log(err);
        }
    }

    const ItSkillsArray = useMemo(() => [
        "JavaScript",
        "Python",
        "Java",
        "C++",
        "C#",
        "PHP",
        "HTML",
        "CSS",
        "SQL",
        "Ruby",
        "TypeScript",
        "Swift",
        "Kotlin",
        "Go",
        "R",
        "Perl",
        "Scala",
        "Dart",
        "Objective-C",
        "Shell Scripting",
        "Bash",
        "PowerShell",
        "AWS",
        "Azure",
        "Google Cloud Platform",
        "Docker",
        "Kubernetes",
        "Linux",
        "Windows Server",
        "DevOps",
        "Networking",
        "Cybersecurity",
        "Blockchain",
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
        "Big Data",
        "Hadoop",
        "Spark",
        "TensorFlow",
        "React.js",
        "Next.js",
        "React native",
        "Angular",
        "Vue.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "MySQL",
        "PostgreSQL",
        "NoSQL",
        "GraphQL",
        "RESTful APIs",
        "Spring Boot",
        "Hibernate",
        "Laravel",
        "Django",
        "Flask",
        "Ruby on Rails",
        "ASP.NET",
        "Jenkins",
        "Terraform",
        "Ansible",
        "Puppet",
        "Jira",
        "Git",
        "GitHub",
        "GitLab",
        "CI/CD",
        "Agile Methodologies",
        "Scrum",
        "Jupyter",
        "MATLAB",
        "SAS",
        "Figma",
        "Adobe XD",
        "UI/UX Design",
        "Unity",
        "Unreal Engine",
        "Game Development",
        "Cloud Computing",
        "Mobile App Development",
        "IoT (Internet of Things)",
        "Robotics",
        "3D Modeling",
        "Natural Language Processing",
        "Augmented Reality (AR)",
        "Virtual Reality (VR)"
    ]);

    return (
        <AppContext.Provider value={{
            JobberProfileInfo,
            EmployerProfileInfo,
            fetchJobberInfo,
            fetchEmployerInfo,
            ItSkillsArray
        }}>
            {props.children}
        </AppContext.Provider>
    );
}