import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/index.jsx";
import { Registro } from "../pages/registro/index.jsx";
import { PrivateRoute } from "./privateRoute.jsx";
import { Home } from "../pages/home/index.jsx";

export function Rotas() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
