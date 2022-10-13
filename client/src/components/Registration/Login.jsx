import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";
import Input from "../../utils/Input/Input";
import "./Registration.css";

const Login = () => {
    const [email, setEmail] = useState("nohrin.max@yandex.ru");
    const [password, setPassword] = useState("xxXX1234");
    const dispatch = useDispatch();

    return (
        <>
            <div className="registration">
                <div className="registration__header">Авторизация</div>
                <Input
                    value={email}
                    setValue={setEmail}
                    type="text"
                    placeholder="Введите email..."
                />
                <Input
                    value={password}
                    setValue={setPassword}
                    type="password"
                    placeholder="Введите пароль..."
                />
                <button
                    onClick={() => dispatch(login(email, password))}
                    className="registration__btn"
                >
                    Войти
                </button>
            </div>
        </>
    );
};

export default Login;
