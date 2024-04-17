import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BookDetails } from "../pages/bookdetails/index.jsx";
import { Bookmarks } from "../pages/bookmarks/index.jsx";
import { Home } from "../pages/home/index.jsx";
import { Login } from "../pages/login/index.jsx";
import { Registro } from "../pages/registro/index.jsx";
import { PrivateRoute } from "./privateRoute.jsx";
import { Settings } from "../pages/settings/index.jsx";
import { NotFound } from "../pages/404/index.jsx";

export function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Shelfie-front-end" element={<Login />} />
        <Route path="/Shelfie-front-end/registro" element={<Registro />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/Shelfie-front-end/home" element={<Home />} />
          <Route path="/Shelfie-front-end/bookmarks" element={<Bookmarks />} />
          <Route path="/Shelfie-front-end/bookdetails/:id" element={<BookDetails />} />
          <Route path="/Shelfie-front-end/me" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}
