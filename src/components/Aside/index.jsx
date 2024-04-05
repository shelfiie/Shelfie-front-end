import { useContext } from "react";
import Bookmark from "../../assets/icons/bookmarks.png";
import Home from "../../assets/icons/home.png";
import Configuracoes from "../../assets/icons/settings.png";
import { MyBookLogo } from "../../assets/logos/mybook-logo.tsx";
import { Logo } from "../../assets/logos/shelfie-logo.svg.tsx";
import { Theme } from "../../styles/theme.ts";
import { Perfil } from "../Profile/index.jsx";
import { Botao } from "../globals/Button.style.tsx";
import { AsideStyles } from './index.styles.ts';
import { AuthContext } from "../../context/auth.jsx";
import { Navigate } from "react-router-dom";

const navItems = [
    { src: Home, name: "Home", route: "/home" },
    { src: Bookmark, name: "Bookmarks", route: "/bookmarks"},
    { src: Configuracoes, name: "Configurações", route: "" }
];

export const Aside = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = (event) => {
        event.preventDefault();
        logout();
    };
    return (
        <AsideStyles>
            <div>
                <MyBookLogo
                    color={Theme.colors.light}
                    fontSize={Theme.font.sizes.small}
                    fontWeight={Theme.font.weight.regular}
                    marginbottom="-1.5rem" />
                <Logo />

                <Perfil />
            </div>

            <nav>
                <ul>
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <img src={item.src} alt="" />
                            <a href={item.route}>{item.name}</a>
                        </li>
                    ))}
                </ul>
            </nav>

            <form onSubmit={handleLogout}>
                <Botao
                    backgroundcolor={Theme.colors.blue}
                    color={Theme.colors.light}
                    fontSize={Theme.font.sizes.xsmall}
                    content="Sair da conta"
                    type="submit"
                />
            </form>
        </AsideStyles>
    );
};