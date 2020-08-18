import {Redirect, Route} from "react-router-dom";
import React from "react";

const PrivateRoute = ({ component: Component, ...props }) => (
    <Route {...props} render={props => localStorage.getItem("token") ? (<Component {...props} />) : (<Redirect to="/login" />)} />
);

export default PrivateRoute;