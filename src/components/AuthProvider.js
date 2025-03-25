import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {userManager} from "./config/auth.config";

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await userManager.getUser();
            setUser(user);
            if (user && user.access_token) {
                const decodedToken = jwtDecode(user.access_token);
                setRoles(decodedToken.roles ? decodedToken.roles.split(" ") : []);
            } else {
                setRoles([]);
            }
        };

        fetchUser();

        const onUserLoaded = (newUser) => {
            setUser(newUser);
            if (newUser && newUser.access_token) {
                const decodedToken = jwtDecode(newUser.access_token);
                setRoles(decodedToken.roles ? decodedToken.roles.split(" ") : []);
            } else {
                setRoles([]);
            }
        };

        userManager.events.addUserLoaded(onUserLoaded);
        userManager.events.addUserUnloaded(() => {
            setUser(null);
            setRoles([]);
        });

        return () => {
            userManager.events.removeUserLoaded(onUserLoaded);
            userManager.events.removeUserUnloaded(() => {
                setUser(null);
                setRoles([]);
            });
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, roles }}>
            {children}
        </AuthContext.Provider>
    );
};
