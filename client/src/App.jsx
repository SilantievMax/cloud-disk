import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Registration from "./components/Registration/Registration";
import Login from "./components/Registration/Login";
import { useEffect } from "react";
import { auth } from "./actions/user";
import Disk from "./components/Disk/Disk";

const App = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, []);

    return (
        <>
            <Navbar />
            {!isAuth ? (
                <Routes>
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            ) : (
                <Routes>
                    <Route exact path="/" element={<Disk />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            )}
        </>
    );
};

export default App;
