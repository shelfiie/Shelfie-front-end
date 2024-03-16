import styled from "styled-components";
import { Theme } from "../../styles/theme";

const PageContent = styled.div`
    width: 100%;
    height: 90%;
    background-color: ${Theme.colors.light};

    border-radius: ${Theme.borders.radius};
    border: .3rem solid ${Theme.colors.deep};

`

const Wrapper = styled.aside`
    height: 100vh;
    width: 100vw;

    display: grid;

    grid-template-columns: 1fr 5fr;
    background-color: ${Theme.colors.orange};

`

const Aside = styled.aside`
    background-color: ${Theme.colors.dark};
    display: flex;
    flex-direction: column;
    align-items: center;
    
    margin-top: ${Theme.margins.margin10rem};

    svg{
        width: 80%;
    }
`

export { PageContent, Wrapper, Aside }