import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyBookLogo } from "../../assets/logos/mybook-logo.tsx";
import { Logo } from "../../assets/logos/shelfie-logo.svg.tsx";
import { Theme } from "../../styles/theme.ts";
import { Botao } from "../globals/Button.style.tsx";
import { AsideStyles, LogOutForm, Nav, UlNav } from './aside.styles.ts';
import { AuthContext } from "../../api/context/auth.tsx";
import { Perfil } from "../Profile/profile.tsx";
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { UserRole } from "../../types/userType.ts";

export const Aside = () => {
    const { logout, user, refetchUser } = useContext(AuthContext);
    useEffect(() => {
        refetchUser && refetchUser();
    }, [])

    const navItems = [
        { src: MenuBookRoundedIcon, name: "Biblioteca", route: "/home" },
        { src: EditNoteRoundedIcon, name: "Progressões", route: "/progressions" },
        { src: ReviewsIcon, name: "Avaliações", route: "/reviews" },
    ];

    if (user?.role === UserRole.ADMIN) {
        navItems.push({ src: SupervisorAccountRoundedIcon, name: "Admin Dashboard", route: "/admin" });
    }

    const handleLogout = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        logout();
    }

    return (
        <AsideStyles id="aside-styles">
            <div>
                <MyBookLogo
                    color={Theme.colors.light}
                    fontSize={`${Theme.font.sizes.small}`}
                    fontWeight={`${Theme.font.weight.regular}`}
                    marginbottom="-1.5rem" />
                <Logo />
            </div>

            <Link style={{ textDecoration: 'none', width: '100%' }} to="/me">
                <Perfil />
            </Link>

            <Nav>
                <UlNav>
                    {navItems.map((item, index) => (
                        <Link to={item.route} key={index}>
                            <li key={item.name}>
                                <item.src />
                                {item.name}
                            </li>
                        </Link>
                    ))}
                </UlNav>
            </Nav>

            <LogOutForm onSubmit={handleLogout}>
                <Botao
                    backgroundColor={Theme.colors.blue}
                    color={Theme.colors.light}
                    fontSize={Theme.font.sizes.xsmall}
                    padding="1rem"
                    content="Sair da conta"
                    type="submit"
                    width="100%"
                >
                    Sair da Conta
                </Botao>
            </LogOutForm>
        </AsideStyles>
    );
};