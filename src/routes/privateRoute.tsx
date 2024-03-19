import React from "react";
import { Navigate, Route, RouteProps,  } from "react-router-dom";
import { isUserAuthenticated } from "../utils/auth";

type RotaProtegidaProps = {
    element: React.ReactNode;
} & RouteProps;

const RotaProtegida: React.FC<RotaProtegidaProps> = ({ element: Component, ...rest }) => {
 
};

export { RotaProtegida }