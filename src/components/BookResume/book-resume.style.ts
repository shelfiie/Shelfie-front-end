import styled from "styled-components";
import { Theme } from "../../styles/theme";
import { BoxShadow } from "../globals/Box.style";

const StyledLixeira = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
`

const StyledBookCover = styled.img`
    width: 7rem;
    transition: transform 0.3s ease-in-out;
`

const StyledOptions = styled.div`
    display: inline-flex;
    align-items: center;
    gap: ${Theme.margins.marginhalfrem};
    width: 100%;
`

const StyledBookResumeContainer = styled(BoxShadow)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${Theme.margins.marginhalfrem};

    padding: ${Theme.margins.margin5px};

    box-shadow: 0px 0px 0px 0px;
    border-radius: ${Theme.borders.radius};
`

const StyledBookDetails = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${Theme.margins.margin5px};
`
const StyledBookTitle = styled.p`
    font-size: ${Theme.font.sizes.xsmall};
    font-weight: ${Theme.font.weight.bold};
`

export { StyledLixeira, StyledOptions, StyledBookCover, StyledBookResumeContainer, StyledBookDetails, StyledBookTitle }