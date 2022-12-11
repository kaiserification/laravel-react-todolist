import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
});

export function AuthProvider({children}) {
    const [user, setUser]    = useState(null);
    const [token, _setToken] = useState(localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN_KEY));
    const [notification, _setNotification] = useState(null);

    const setNotification = (message) => {
        _setNotification(message);
        window.setTimeout(() => {
            _setNotification(null);
        }, 1000);
    }

    const setToken = (token) => {
        if(token) {
            localStorage.setItem(import.meta.env.VITE_ACCESS_TOKEN_KEY, token);
        } else {
            localStorage.removeItem(import.meta.env.VITE_ACCESS_TOKEN_KEY);
        }
        
        _setToken(token);
    }

    return (
        <AuthContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            notification,
            setNotification
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);