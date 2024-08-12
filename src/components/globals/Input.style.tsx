import styled from "styled-components";
import { Theme } from "../../styles/theme";

const InputStyle = styled.input`
    border: ${Theme.borders.border2px} solid ${Theme.colors.deep};
    border-radius: ${Theme.borders.radiusRound};
    padding: 1.5rem;
    width: 100%;
`;

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    return (
        <InputStyle {...props} />
    );
};