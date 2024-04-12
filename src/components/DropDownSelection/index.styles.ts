import styled from "styled-components";
import { Theme } from "../../styles/theme";

export type DropDownType = {
    content: string,
    options?: string[],
}

export interface DropDownSelectionProps {
    backgroundcolor?: string;
    color?: string;
    fontSize: string;
    fontWeight?: string;
    padding?: string;
    top?: string;
}


const DropDownStyles = styled.div<DropDownSelectionProps & { isOpen: boolean }>`
    background-color: ${(props) => props.backgroundcolor};
    color: ${(props) => props.color};
    width: max-content;

    display: inline-flex;
    align-items: center;
    justify-content: space-around;
    gap: ${Theme.margins.marginhalfrem};

    font-size: ${(props) => props.fontSize};
    font-weight: ${(props) => props.fontWeight};
    
    padding: ${(props) => props.padding || '.5rem 1rem'};
    border: ${Theme.borders.border3px} solid black;
    border-radius: ${Theme.borders.radius};

    position: relative;
    transition: all 0.3s ease-in-out;

    ul {
        display: ${props => props.isOpen ? 'block' : 'none'};
        width: max-content;
        position: absolute;
        top: ${props => props.top || '110%'};
        left: 0;

        background-color: inherit;
        color: inherit;
        border-radius: 0 0 ${Theme.borders.radius} ${Theme.borders.radius};

        z-index: 1;

        box-shadow: 5px 5px black;
    }
`;

const Option = styled.li<DropDownSelectionProps>`
    font-size: inherit;
    font-weight: inherit;

    padding: ${(props) => props.padding || '.5rem 1rem'};

    list-style: none;
    transition: 300ms ease-in-out;

    &:hover{
        background-color: ${Theme.colors.dark};
    }
`;


export { DropDownStyles, Option };

