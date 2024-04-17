import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth.jsx";

export const PrivateRoute = () => {
    const { signed } = useContext(AuthContext);
    return signed ? <Outlet /> : <Navigate to={'/Shelfie-front-end'} />;
}