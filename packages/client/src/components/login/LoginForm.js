import React from "react";
import { Field, reduxForm } from "redux-form";
import { BwmInput } from "../shared/form/BwmInput";
import { BwmResError } from "../shared/form/BwmResError";
import { required, minLength4 } from "../shared/form/Validators";

function LoginForm(props) {
    const {
        handleSubmit,
        valid,
        pristine,
        submitting,
        loginUser,
        errors,
    } = props;
    return (
        <form onSubmit={handleSubmit(loginUser)}>
            <Field
                label="Email"
                name="email"
                type="email"
                className="form-control"
                component={BwmInput}
                validate={[required, minLength4]}
            />
            <Field
                label="Password"
                name="password"
                type="password"
                className="form-control"
                component={BwmInput}
                validate={[required]}
            />
            <div>
                <button
                    className="btn btn-bwm btn-form"
                    type="submit"
                    disabled={!valid || pristine || submitting}
                >
                    Login
                </button>
                <BwmResError errors={errors}></BwmResError>
            </div>
        </form>
    );
}

export default reduxForm({
    form: "loginForm",
})(LoginForm);
