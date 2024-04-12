import styled from "styled-components";
import { Theme } from "../../styles/theme";

const Carrousel = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        /* border-radius: ${Theme.borders.radius}; */
        
    }
`

export { Carrousel }