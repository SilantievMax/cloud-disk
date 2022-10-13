import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/migration.png";
import { logout } from "../../reducers/userReducer";
import "./Navbar.css";

const Navbar = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();

    return (
        <div className="navbar wrapper">
            <div className="navbar__logo">
                <img src={logo} alt="" className="navbar__logo-img" />
                <div className="navbar__header">MERN CLOUD</div>
            </div>
            {!isAuth && (
                <div className="navbar__nav">
                    <div className="navbar__login">
                        <NavLink to="/login">Войти</NavLink>
                    </div>
                    <div className="navbar__registration">
                        <NavLink to="/registration">Регистрация</NavLink>
                    </div>
                </div>
            )}
            {isAuth && (
                <div className="navbar__nav">
                    <div onClick={() => dispatch(logout())} className="navbar__login">Выйти</div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
