import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyBookLogo } from "../../assets/logos/mybook-logo.tsx";
import { Logo } from "../../assets/logos/shelfie-logo.svg.tsx";
import { Theme } from "../../styles/theme.ts";
import { Botao } from "../globals/Button.style.tsx";
import { AsideStyles, Nav, UlNav } from './aside.styles.ts';
import { AuthContext } from "../../api/context/auth.tsx";
import { Perfil } from "../Profile/profile.tsx";
import { useFetchUserData } from "../../api/hooks/useFetchUserData.ts";
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import { UserRole } from "../../types/userType.ts";

export const Aside = () => {
    const { logout } = useContext(AuthContext);
    const { user } = useFetchUserData();

    const navItems = [
        { src: MenuBookRoundedIcon, name: "Biblioteca", route: "/home" },
        { src: PersonRoundedIcon, name: "Perfil", route: "/me" },
        // { src: Bookmark, name: "Bookmarks", route: "/bookmarks" },
    ];

    if (user?.role === UserRole.ADMIN) {
        navItems.push({ src: SupervisorAccountRoundedIcon, name: "Admin Dashboard", route: "/admin" });
    }

    const handleLogout = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        logout();
    }

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
                                <item.src />
                                {/* <img src={item.src} alt="" /> */}
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