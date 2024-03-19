import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { Registro } from "../pages/registro";
import { Home } from "../pages/home";
// import { RotaProtegida } from "./privateRoute";

export function Rotas() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/home" element={<Home />} />
            {/* <RotaProtegida path="/home" element={<Home />} /> */}
        </Routes>
    </BrowserRouter>
  )
}
