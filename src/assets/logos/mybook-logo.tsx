import React from "react";
import styled from "styled-components";
import { Theme } from "../../styles/theme";

interface MyBookLogoProps extends React.HTMLAttributes<HTMLParagraphElement> {
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    marginLeft?: string;
    marginbottom?: string;
}

const MyBookStyle = styled.p<MyBookLogoProps>`
    font-family: ${Theme.font.family.poppins};
    font-size: ${(props) => props.fontSize || Theme.font.sizes.big1x};
    font-weight: ${(props) => props.fontWeight || Theme.font.weight.medium};
    color: ${(props) => props.color || Theme.colors.deep};

    letter-spacing: .2rem;
    margin-bottom: ${(props) => props.marginbottom || "-2.5rem"};
    margin-left: ${(props) => props.marginLeft || "-2rem"};
`

export const MyBookLogo = ( props : MyBookLogoProps) => {
    return (
        <MyBookStyle { ...props }>MyBook</MyBookStyle>
    );
};