import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth.jsx";

export const PrivateRoute = () => {
    const { signed } = useContext(AuthContext);
    console.log("passando pela private route, valor do signed: " + signed);
    return signed ? <Outlet /> : <Navigate to={'/'} />;
}