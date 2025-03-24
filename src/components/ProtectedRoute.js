import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ element, allowedRoles, userRole }) => {
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }
    return element;
};

export default ProtectedRoute;
