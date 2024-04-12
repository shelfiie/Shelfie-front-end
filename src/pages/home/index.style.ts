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

    &::-webkit-scrollbar {
        /* border-radius: ${Theme.borders.radius}; */
        
    }
`

export { Carrousel, CarrouselTitle }