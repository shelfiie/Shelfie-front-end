import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/404/index.js";
import { Login } from "../pages/login/login.tsx";
import { Home } from "../pages/home/home.tsx";
import { Profile } from "../pages/profile/profile-index.tsx";
import { BookDetails } from "../pages/bookdetails/book-details.tsx";
import { PrivateRoute } from "./privateRoute.tsx";
import { Registro } from "../pages/registro/registro.tsx";

export function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/bookdetails/:id" element={<BookDetails />} />
          {/* <Route path="/progression" element={} /> */}
          {/* <Route path="/bookmarks" element={<Bookmarks />} /> */}
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}
