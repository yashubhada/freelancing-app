import { createContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const url = "http://localhost:9171"; // API URL

    const [userProfileInfo, setUserProfileInfo] = useState({});

    const fetchJobberInfo = async (id) => {
        try {
            const response = await axios.post(`${url}/jobber/findSingleJobber/${id}`);
            setUserProfileInfo(response.data.jobber);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AppContext.Provider value={{
            userProfileInfo,
            fetchJobberInfo,
        }}>
            {props.children}
        </AppContext.Provider>
    );
}