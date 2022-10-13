import React from "react";
import "./Input.css";

const Input = (props) => {
    return (
        <input
            onChange={(e) => props.setValue(e.target.value)}
            value={props.value}
            className="input"
            type={props.type}
            placeholder={props.placeholder}
        />
    );
};

export default Input;
