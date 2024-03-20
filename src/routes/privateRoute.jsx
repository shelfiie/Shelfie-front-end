import {useContext} from "react";
import {AuthContext} from "../context/auth.jsx";
import {Navigate, Outlet} from "react-router-dom";

export const PrivateRoute = () => {
    const { signEd } = useContext(AuthContext);
    return signEd ? <Outlet /> : <Navigate to={'/'} />;
}