import { useCallback, useContext, useState } from "react";
import Bookmark from "../../assets/icons/bookmarks.png";
import Home from "../../assets/icons/home.png";
import Profile from "../../assets/icons/profile.png";
import { MyBookLogo } from "../../assets/logos/mybook-logo.tsx";
import { Logo } from "../../assets/logos/shelfie-logo.svg.tsx";
import { Theme } from "../../styles/theme.ts";
import { Perfil } from "../Profile/index.jsx";
import { Botao } from "../globals/Button.style.tsx";
import { AsideStyles } from './index.styles.ts';
import { AuthContext } from "../../context/auth.jsx";
import { Link } from "react-router-dom";


// to do = desestruturação
export const Aside = () => {
    const { logout } = useContext(AuthContext);


    const navItems = [
        { src: Profile, name: "Perfil", route: "/me" },
        { src: Home, name: "Home", route: "/home" },
        { src: Bookmark, name: "Bookmarks", route: "/bookmarks" },
    ];

    const handleLogout = useCallback((event) => {
        event.preventDefault();
        logout();
    }, [logout]);


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
                    {navItems.map((item, index) => (
                        <Link to={item.route} key={index}>
                            <li key={item.name}>
                                <img src={item.src} alt="" />
                                {item.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </nav>

            <form onSubmit={handleLogout}>
                <Botao
                    backgroundcolor={Theme.colors.blue}
                    color={Theme.colors.light}
                    fontSize={Theme.font.sizes.xsmall}
                    padding="0.5rem 1rem"
                    content="Sair da conta"
                    type="submit"
                />
            </form>
        </AsideStyles>
    );
};