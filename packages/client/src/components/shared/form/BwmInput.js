import React from "react";
export const BwmInput = ({
    input,
    label,
    type,
    symbol,
    className,
    meta: { touched, error },
}) => (
    <div className="form-group">
        <label>{label}</label>
        <div className="input-group">
            {symbol && (
                <div className="input-group-prepend">
                    <div className="input-group-text">{symbol}</div>
                </div>
            )}
            <input
                autoComplete="off"
                {...input}
                min="0"
                type={type}
                className={className}
            />
        </div>
        {touched && error && <div className="alert alert-danger">{error}</div>}
    </div>
);
