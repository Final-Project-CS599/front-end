import { createContext, useState, useEffect } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const data = JSON.parse(localStorage.getItem('userData'));

        if (token) {
            setUserToken(token);
        }

        if (data) {
            setUserData(data);
        }
    }, [])

    return (
        <UserContext.Provider value={{ userToken, setUserToken, userData, setUserData }}>
            {props.children}
        </UserContext.Provider>
    );
};



