import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BeverageList from "./components/beverages-panel/beverages-panel";
import LunchesPanel from "./components/lunches-panel/lunches-panel";
import Callback from "./components/auth-service/Callback";
import AuthPanel from "./components/auth-panel/auth-panel";
import MealsPanel from "./components/meals-panel/meals-panel";
import Sidebar from "./components/Sidebar/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, AuthContext } from "./components/AuthProvider";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <MainContent />
            </Router>
        </AuthProvider>
    );
};

const MainContent = () => {
    const { roles } = useContext(AuthContext);
    return (
        <div className="app">
            <AuthPanel />
            <Sidebar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<BeverageList />} />
                    <Route path="/beverages" element={<BeverageList />} />
                    <Route path="/lunches" element={<LunchesPanel />} />
                    <Route path="/callback" element={<Callback />} />
                    <Route
                        path="/meals"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN"]} userRole={roles[0]} element={<MealsPanel />} />
                        }
                    />
                </Routes>
            </div>
        </div>
    );
};

export default App;
