import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Registration from "./components/Registration/Registration";
import Login from "./components/Registration/Login";
import { useEffect } from "react";
import { auth } from "./actions/user";

const App = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, []);

    return (
        <>
            <Navbar />
            {!isAuth && (
                <Routes>
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            )}
        </>
    );
};

export default App;
