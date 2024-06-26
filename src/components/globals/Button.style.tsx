import React from "react";
import styled from "styled-components";
import { Theme } from "../../styles/theme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    backgroundcolor?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    padding?: string;
    borderRadius?: string;
    width?: string;
}

type ButtonType = {
    content: string,
    type?:  "button" | "submit" | "reset" | undefined,
    disabled?: boolean
    onClick?: () => void
}


const ButtonWithShadow = styled.button<ButtonProps>`
    background-color: ${(props) => props.backgroundcolor};
    color: ${(props) => props.color};

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

export const Botao : React.FC<ButtonType> = ({content, type, disabled, onClick, ...props}) => {
    return(
        <ButtonWithShadow 
            content={content}
            onClick={onClick}
            type={type}
            disabled={disabled}
            {...props}
            > {content} </ButtonWithShadow>
    )

}