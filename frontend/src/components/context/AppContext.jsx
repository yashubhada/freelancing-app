import { createContext } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
    const check = 100;
    return(
        <AppContext.Provider value={{
            check
        }}>
            {props.children}
        </AppContext.Provider>
    );
}