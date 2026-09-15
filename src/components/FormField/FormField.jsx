import React from "react";

import "./FormField.css";

export default function FormFiled({
    label = "text",
    id = "text",
    type = "text",
    placeholder = "text",
    icon,
    endIcon,
    value,
    onChange,
    onBlur,
    error
    
}) {
    return (
        <div className="form-group">
            <label htmlFor={id}>
                {label}
            </label>

            <div className="input-container">
                {icon && (
                    <span className="input-icon">
                        {icon}
                    </span>
                )}

                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />

                {endIcon && (
                    <div className="input-end-icon">
                        {endIcon}
                    </div>
                )}
            </div>

            {error && (
                <span className="input-error">
                    {error}
                </span>
            )}
        </div>
    );
}
