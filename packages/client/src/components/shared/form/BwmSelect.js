import React from "react";
export const BwmSelect = ({
    input,
    label,
    options,
    className,
    meta: { touched, error },
}) => {
    function renderOptions(options) {
        return options.map((option, index) => {
            return (
                <option key={index} value={option}>
                    {option}
                </option>
            );
        });
    }
    return (
        <div className="form-group">
            <label>{label}</label>
            <div className="input-group">
                <select autoComplete="off" {...input} className={className}>
                    {renderOptions(options)}
                </select>
            </div>
            {touched && error && (
                <div className="alert alert-danger">{error}</div>
            )}
        </div>
    );
};
