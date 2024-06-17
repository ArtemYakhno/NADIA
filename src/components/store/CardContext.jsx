// CardContext.js
import React, { createContext, useState } from 'react';
import {users} from "../../datas/users.js";

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
    const [isTokenValid, setIsTokenValid] = useState(true);
    const [activeUser, setActiveUser]=useState(users[0])


    return (
        <CardContext.Provider value={{ isTokenValid, setIsTokenValid,activeUser, setActiveUser }}>
            {children}
        </CardContext.Provider>
    );
};
