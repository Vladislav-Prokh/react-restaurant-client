import React,{ useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userManager } from "../config/auth.config";

const Callback = () => {
    const navigate = useNavigate();
    useEffect(() => {
        userManager.signinRedirectCallback()
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error("An error during auth:", error);
            });
    }, [navigate]);
    return <div>Redirecting to home...</div>;
};

export default Callback;
