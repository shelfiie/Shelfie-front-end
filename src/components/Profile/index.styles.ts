import styled from "styled-components";
import { Theme } from "../../styles/theme";

const ProfileContainer = styled.div`
    margin-top: ${Theme.margins.margin2rem};
    background-color: ${Theme.colors.blue};
    border-radius: ${Theme.borders.radiusRound};

    display: flex;
    align-items: center;
    justify-content: space-around;

    gap: ${Theme.margins.margin5px};

    padding: ${Theme.margins.margin5px};

    font-size: ${Theme.font.sizes.xsmall};
    color: ${Theme.colors.white};
    img{
        width: 50px;
        height: 50px;
        border-radius: ${Theme.borders.radiusRound};
    }
`

export { ProfileContainer };

