import styled from "styled-components";
import { Theme } from "../../styles/theme";
import React from "react";

interface BoxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: string;
    backgroundcolor?: string;
    shadowcolor?: string;
    padding?: string;
    borderRadius?: string;
    width?: string;
    display?: string;
    flexDirection?: string;
    gap?: string;
}

const Box = styled.div<BoxProps>`
    display: ${props => props.display || null};
    flex-direction: ${props => props.flexDirection || null};
    gap: ${props => props.gap || null};
    border-radius: ${props => props.borderRadius || Theme.borders.radiusRound};

    height: max-content;
    text-align: center;
    width: ${props => props.width || "100%"};
    background-color: ${props => props.backgroundcolor};
    box-shadow: 9px 9px ${props => props.shadowcolor || "#000"};
    color: ${(props) => props.color || "#000"};

    padding: ${(props) => props.padding};
`

export const BoxShadow: React.FC<BoxProps> = ({ ...props }) => {
    return (
        <Box
            {...props}
        />
    )
}