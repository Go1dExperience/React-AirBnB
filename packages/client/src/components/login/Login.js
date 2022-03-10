import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import LoginForm from "./LoginForm";

import { login } from "../../actions";
function Login(props) {
    const { login, auth, location } = props;
    // Check if state exists first, if not we can't get into state.from, which would throw an error
    // If it doesn't exist, set default to /rentals
    // from.pathname because we send the whole location object as from.
    const pathname =
        location.state && location.state.from
            ? location.state.from.pathname
            : "/rentals";
    // auth state and errors come from action dispatch
    const { isAuth, errors } = auth;
    const { successRegister } = location.state || false;
    const loginUser = values => {
        login(values);
    };
    if (isAuth) {
        return <Redirect to={{ pathname }}></Redirect>;
    }
    return (
        <section id="login">
            <div className="bwm-form">
                <div className="row">
                    <div className="col-md-5">
                        <h1>Login</h1>
                        {
                            // Selector Operator, if successRegister is true, returns div
                            successRegister && (
                                <div className='"alert alert-success'>
                                    <p>
                                        Register successfully. Please login to
                                        continue
                                    </p>
                                </div>
                            )
                        }
                        <LoginForm
                            loginUser={loginUser}
                            errors={errors}
                        ></LoginForm>
                    </div>
                    <div className="col-md-6 ml-auto">
                        <div className="image-container">
                            <h2 className="catchphrase">
                                Hundreds of awesome places in reach of few
                                clicks.
                            </h2>
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    "/image/login-image.jpg"
                                }
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const mapState = state => ({
    auth: state.auth,
});
export default connect(mapState, { login })(Login);
