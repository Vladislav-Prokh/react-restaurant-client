import React, { useContext } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import {AuthContext} from "../AuthProvider";

const Sidebar = () => {
    const { roles } = useContext(AuthContext);
    const isAdmin = roles.includes("ADMIN");
    return (
        <div className="sidebar">
            <h2>Panel</h2>
            <ul>
                <li><Link to="/beverages">beverages</Link></li>
                <li><Link to="/lunches">lunches</Link></li>
                {isAdmin && <li><Link to="/meals">meals</Link></li>}
            </ul>
        </div>
    );
};

export default Sidebar;
