import styled from "styled-components";
import { Theme } from "../../styles/theme";

const CarrouselTitle = styled.h2`
    margin-bottom: ${Theme.margins.margin1rem};
`

const Carrousel = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-behavior: smooth;
    height: 100%;
`

const EmptyCarrousel = styled.p`
    margin: 0 auto;
    font-size: ${Theme.font.sizes.small};
    color: ${Theme.colors.lightDark};
`

export { Carrousel, CarrouselTitle, EmptyCarrousel }