import Home from "../../assets/icons/home.png";
import Bookmark from "../../assets/icons/bookmarks.png";
import Configuracoes from "../../assets/icons/settings.png";
import { MyBookLogo } from "../../assets/logos/mybook-logo.tsx";
import { Logo } from "../../assets/logos/shelfie-logo.svg.tsx";
import { Theme } from "../../styles/theme.ts";
import { AsideStyles } from './index.styles.ts';

const navItems = [
    {src: Home, name: "Home"},
    {src: Bookmark, name: "Bookmarks"},
    {src: Configuracoes, name: "Configurações"}
];

export const Aside = () => {
    return (
        <AsideStyles>
            <MyBookLogo color={Theme.colors.light} fontSize={Theme.font.sizes.small} fontWeight={Theme.font.weight.regular} />
            <Logo />
            
            <nav>
                <ul>
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <img src={item.src} alt="" />
                            <a href="#">{item.name}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </AsideStyles>
    );
}