import styled from "styled-components";
import { Theme } from "../../styles/theme";

interface BoxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: string;
    shadowColor?: string;
}

export const BoxShadow = styled.div<BoxProps>`

    border-radius: ${Theme.borders.radiusRound};

    height: fit-content;
    width: fit-content;
    text-align: center;
    
    background-color: ${(props) => props.color};
    box-shadow: 9px 9px ${(props) => props.shadowColor || "#000"};
`