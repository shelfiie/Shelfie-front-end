import { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import Bookmark from "../../assets/icons/bookmarks.png";
import Home from "../../assets/icons/home.png";
import Profile from "../../assets/icons/profile.png";
import { MyBookLogo } from "../../assets/logos/mybook-logo.tsx";
import { Logo } from "../../assets/logos/shelfie-logo.svg.tsx";
import { Theme } from "../../styles/theme.ts";
import { Botao } from "../globals/Button.style.tsx";
import { AsideStyles, Nav, UlNav } from './index.styles.ts';
import { AuthContext } from "../../api/context/auth.tsx";
import { Perfil } from "../Profile/index.tsx";


export const Aside = () => {
    const { logout } = useContext(AuthContext);


    const navItems = [
        { src: Profile, name: "Perfil", route: "/me" },
        { src: Home, name: "Home", route: "/home" },
        { src: Bookmark, name: "Bookmarks", route: "/bookmarks" },
    ];

    const handleLogout = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        logout();
    }, [logout]);


    return (
        <AsideStyles>
            <div>
                <MyBookLogo
                    color={Theme.colors.light}
                    fontSize={`${Theme.font.sizes.small}`}
                    fontWeight={`${Theme.font.weight.regular}`}
                    marginbottom="-1.5rem" />
                <Logo />

                <Perfil />
            </div>

            <Nav>
                <UlNav>
                    {navItems.map((item, index) => (
                        <Link to={item.route} key={index}>
                            <li key={item.name}>
                                <img src={item.src} alt="" />
                                {item.name}
                            </li>
                        </Link>
                    ))}
                </UlNav>
            </Nav>

            <form onSubmit={handleLogout}>
                <Botao
                    backgroundColor={Theme.colors.blue}
                    color={Theme.colors.light}
                    fontSize={Theme.font.sizes.xsmall}
                    padding="0.5rem 1rem"
                    content="Sair da conta"
                    type="submit"
                >
                    Sair da Conta
                </Botao>
            </form>
        </AsideStyles>
    );
};