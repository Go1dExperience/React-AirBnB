import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "../../../services/auth-service";

export default function ProtectedRoute(props) {
    const { component: Component, ...rest } = props;
    return (
        <div>
            <Route
                {...rest}
                render={props =>
                    authService.isAuthenticated() ? (
                        <Component {...props} {...rest}></Component>
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location },
                            }}
                        />
                    )
                }
            ></Route>
        </div>
    );
}
