import React from "react";
import styled from "styled-components";
import { Theme } from "../../styles/theme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    backgroundColor?: string;
    color?: string;
}

type ButtonType = {
    content: string,
    type?:  "button" | "submit" | "reset" | undefined,
    disabled?: boolean
    onClick?: () => void
}


const ButtonWithShadow = styled.button<ButtonProps>`
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};

    font-size: ${Theme.font.sizes.regular};
    font-weight: ${Theme.font.weight.semiBold};
    
    padding: ${Theme.margins.margin1rem};
    border: none;
    border-radius: ${Theme.borders.radius};
    box-shadow: 4px 4px rgba(0, 0, 0);
    
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