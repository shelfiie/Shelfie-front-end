import React from "react";
import styled from "styled-components";
import { Theme } from "../../styles/theme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    padding?: string;
    borderRadius?: string;
    width?: string;
    isError?: boolean;
}

const ButtonWithShadow = styled.button<ButtonProps>`
    background-color: ${(props) => props.isError ? Theme.colors.lightDark : props.backgroundColor || Theme.colors.pink};
    color: ${(props) => props.color};

    cursor: pointer;

    font-size: ${(props) => props.fontSize || Theme.font.sizes.regular};
    font-weight: ${(props) => props.fontWeight || Theme.font.weight.semiBold};
    
    padding: ${(props) => props.padding || Theme.margins.margin1rem};
    border: none;
    border-radius: ${props => props.borderRadius || Theme.borders.radiusRound};
    box-shadow: 4px 4px rgba(0, 0, 0);
    
    width: ${props => props.width || '100%'};

    transition: all 0.3s ease-in-out;
    
    &:hover{
        background: ${Theme.colors.lightDark};
    }

    `;

export const Botao: React.FC<ButtonProps> = ({ isError, children, ...rest }) => {
    return (
        <ButtonWithShadow isError={isError}
            {...rest}
        >{children}</ButtonWithShadow>
    )

}