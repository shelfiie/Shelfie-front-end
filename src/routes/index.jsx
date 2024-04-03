import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Bookmarks } from "../pages/bookmarks/index.jsx";
import { Home } from "../pages/home/index.jsx";
import { Login } from "../pages/login/index.jsx";
import { Registro } from "../pages/registro/index.jsx";

export function Rotas() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
              <Route path="/home" element={<Home />} />
              <Route path="/bookmarks" element={<Bookmarks />} />

            {/* <Route element={<PrivateRoute />}>
            </Route> */}
        </Routes>
    </BrowserRouter>
  )
}
