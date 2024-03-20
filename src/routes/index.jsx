import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/index.jsx";
import { Registro } from "../pages/registro/index.jsx";

export function Rotas() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
             {/*<RotaProtegida path="/home" element={<Home />} />*/}
        </Routes>
    </BrowserRouter>
  )
}
