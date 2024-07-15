import styled from "styled-components";
import { Theme } from "../../styles/theme";

interface BoxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: string;
    backgroundcolor?: string;
    shadowcolor?: string;
    padding?: string;
}

const Box = styled.div<BoxProps>`
    border-radius: ${Theme.borders.radiusRound};

    height: 100%;
    text-align: center;
    
    background-color: ${props => props.backgroundcolor};
    box-shadow: 9px 9px ${props => props.shadowcolor || "#000"};
    color: ${(props) => props.color || "#000"};

    padding: ${(props) => props.padding};
`

export const BoxShadow = ({...props}) => {
    return(
        <Box 
            {...props}
        />
    )
}