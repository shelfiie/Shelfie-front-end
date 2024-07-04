import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BookDetails } from "../pages/bookdetails/index.jsx";
import { Bookmarks } from "../pages/bookmarks/index.jsx";
import { Home } from "../pages/home/index.jsx";
import { Login } from "../pages/login/index.tsx";
import { Registro } from "../pages/registro/index.jsx";
import { PrivateRoute } from "./privateRoute.jsx";
import { Settings } from "../pages/settings/index.jsx";
import { NotFound } from "../pages/404/index.jsx";

export function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/home" element={<Home />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/bookdetails/:id" element={<BookDetails />} />
          <Route path="/me" element={<Settings />} />
        {/* </Route> */}

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}
