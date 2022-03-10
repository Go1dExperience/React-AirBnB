import React from "react";
import { Field, reduxForm } from "redux-form";
import { BwmInput } from "../shared/form/BwmInput";
import { BwmResError } from "../shared/form/BwmResError";

const RegisterForm = props => {
    const {
        handleSubmit,
        registerUser,
        valid,
        pristine,
        submitting,
        errors,
    } = props;
    return (
        <form onSubmit={handleSubmit(registerUser)}>
            <Field
                label="Username"
                name="username"
                type="text"
                className="form-control"
                component={BwmInput}
            />
            <Field
                label="Email"
                name="email"
                type="email"
                className="form-control"
                component={BwmInput}
            />
            <Field
                label="Password"
                name="password"
                type="password"
                className="form-control"
                component={BwmInput}
            />
            <Field
                label="Confirm Password"
                name="passwordConfirm"
                type="password"
                className="form-control"
                component={BwmInput}
            />
            <div>
                <button
                    className="btn btn-bwm btn-form"
                    type="submit"
                    disabled={!valid || pristine || submitting}
                >
                    Register
                </button>
                <BwmResError errors={errors}></BwmResError>
            </div>
        </form>
    );
};
// Front-end Validation
const validate = values => {
    const errors = {};

    if (values.username && values.username.length < 4) {
        errors.username = "Username must be at least 4 characters";
    }
    if (!values.email) {
        errors.email = "Email is required";
    }
    if (!values.passwordConfirm) {
        errors.passwordConfirm = "Please confirm your password";
    }
    if (values.password !== values.passwordConfirm) {
        errors.password = "Passwords must be identical";
    }
    return errors;
};

export default reduxForm({
    form: "registerForm", // a unique identifier for this form
    validate,
})(RegisterForm);
