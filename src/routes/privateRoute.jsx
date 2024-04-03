import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth.jsx";

export const PrivateRoute = ({ element, ...rest }) => {
    const { signed } = useContext(AuthContext);
    return signed ? <Outlet /> : <Navigate to={'/'} />;
}