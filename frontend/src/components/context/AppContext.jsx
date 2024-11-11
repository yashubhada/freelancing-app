import { createContext, useMemo } from "react";
import axios from "axios";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const url = "https://proflex-13tx.onrender.com"; // API URL

    // const [EmployerProfileInfo, setEmployerProfileInfo] = useState({});

    const fetchJobberInfo = async (id) => {
        try {
            const response = await axios.post(`${url}/jobber/findSingleJobber/${id}`);
            return response.data.jobber;
        } catch (err) {
            console.log(err);
        }
    }

    const fetchEmployerInfo = async (id) => {
        try {
            const response = await axios.post(`${url}/employer/fetchSingleEmploye/${id}`);
            return response.data.emp;
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
        "Virtual Reality (VR)",
        "Web Developer",
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "MERN Stack Developer",
        "MEAN Stack Developer",
        "Web Designer",
        "UI/UX Designer",
        "Software Engineer",
        "Mobile App Developer",
        "iOS Developer",
        "Android Developer",
        "DevOps Engineer",
        "Data Scientist",
        "Data Analyst",
        "Machine Learning Engineer",
        "Cloud Engineer",
        "Cybersecurity Analyst",
        "Network Administrator",
        "IT Support Specialist",
        "System Administrator",
        "Database Administrator",
        "Blockchain Developer",
        "Game Developer",
        "AR/VR Developer",
        "Product Manager",
        "Digital Marketing Specialist",
        "SEO Specialist",
        "Social Media Manager",
        "Content Strategist",
        "Technical Writer",
        "Solutions Architect",
        "Business Analyst",
        "QA Engineer",
        "Scrum Master",
        "Project Manager",
        "IT Consultant",
        "AI Engineer",
        "CRM Developer",
        "SAP Consultant",
        "Salesforce Developer",
        "IT Security Specialist",
        "Cloud Solutions Architect",
        "Python Developer",
        "JavaScript Developer",
        "PHP Developer",
        "Java Developer",
        "Ruby on Rails Developer",
        "C# Developer",
        "Golang Developer"
    ]);

    return (
        <AppContext.Provider value={{
            fetchJobberInfo,
            fetchEmployerInfo,
            ItSkillsArray
        }}>
            {props.children}
        </AppContext.Provider>
    );
}