import React, { createContext, useContext, useState } from 'react';
import * as SessionUtil from "../util/SessionUtil";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(SessionUtil.getAuthenticationData());

    const setAuthenticationData = (newAuthData) => {
        setAuthData(newAuthData);
    };

    return (
        <AuthContext.Provider value={{ authData, setAuthenticationData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
