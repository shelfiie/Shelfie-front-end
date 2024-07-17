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
    margin-right: ${Theme.margins.margin3rem};
    margin-bottom: ${Theme.margins.margin1rem};
    gap: ${Theme.margins.marginhalfrem};

    padding: ${Theme.margins.margin1rem};

    border-radius: ${Theme.borders.radius};
    border: ${Theme.borders.border3px} solid ${Theme.colors.deep};
    box-shadow: 0px 0px 0 0px;
    background-color: ${Theme.colors.white};
    width: 18%;
    height: min-content;
`
const ResumeTitle = styled.p`
    font-size: ${Theme.font.sizes.xxsmall};
    font-family: ${Theme.font.family.poppins};
    font-weight: ${Theme.font.weight.regular};
    margin: 0;
`

const ButtonWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    flex: 2 1;
    gap: ${Theme.margins.margin1rem};
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

export { StyledLixeira, StyledOptions, StyledBookCover, StyledBookResumeContainer, ResumeTitle, ButtonWrapper, StyledBookDetails, StyledBookTitle }