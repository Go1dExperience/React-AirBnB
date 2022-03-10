import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import * as actions from "../../actions";

export default function Register() {
    const [errors, setErrors] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const registerUser = values => {
        actions
            .register(values)
            .then(registerd => {
                setRedirect(true);
            })
            .catch(errors => {
                setErrors([...errors]);
            });
    };
    if (redirect) {
        return (
            <Redirect
                to={{ pathname: "/login", state: { successRegister: true } }}
            ></Redirect>
        );
    }
    return (
        <div>
            <section id="register">
                <div className="bwm-form">
                    <div className="row">
                        <div className="col-md-5">
                            <h1>Register</h1>
                            <RegisterForm
                                registerUser={registerUser}
                                errors={errors}
                            ></RegisterForm>
                        </div>
                        <div className="col-md-6 ml-auto">
                            <div className="image-container">
                                <h2 className="catchphrase">
                                    As our member you have access to most
                                    awesome places in the world.
                                </h2>
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/image/register-image.jpg"
                                    }
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
