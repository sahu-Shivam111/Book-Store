import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadUser();

    }, []);

    async function loadUser() {

        const token = localStorage.getItem("token");

        if (!token) {

            setLoading(false);

            return;

        }

        try {

            const result = await api.get("/profile");

            setUser(result.data);

        }

        catch {

            localStorage.removeItem("token");

            setUser(null);

        }

        setLoading(false);

    }

    function login(token, user) {

        localStorage.setItem("token", token);

        setUser(user);

    }

    function logout() {

        localStorage.removeItem("token");

        setUser(null);

    }

    return (

        <AuthContext.Provider

            value={{

                user,

                login,

                logout,

                loading

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export default AuthProvider;