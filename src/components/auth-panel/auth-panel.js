import React, { useState, useEffect } from "react";
import { login, logout, userManager } from "../config/auth.config";
import "./auth-panel.css";

function AuthPanel() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const currentUser = await userManager.getUser();
            setUser(currentUser);
        };

        checkAuth();

        const handleUserLoaded = (user) => setUser(user);
        const handleUserUnloaded = () => setUser(null);

        userManager.events.addUserLoaded(handleUserLoaded);
        userManager.events.addUserUnloaded(handleUserUnloaded);

        return () => {
            userManager.events.removeUserLoaded(handleUserLoaded);
            userManager.events.removeUserUnloaded(handleUserUnloaded);
        };
    }, []);

    return (
        <div id="auth-panel">
            {user ? (
                <div>
                    <button onClick={logout} id="logout">Logout</button>
                </div>
            ) : (
                <div>
                    <button onClick={login} id = "login">Login</button>
                </div>
            )}
        </div>
    );
}

export default AuthPanel;
