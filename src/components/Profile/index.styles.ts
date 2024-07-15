import styled from "styled-components";
import { Theme } from "../../styles/theme";

const ProfileContainer = styled.div`
    width: 100%;
    margin-top: ${Theme.margins.margin2rem};
    background-color: ${Theme.colors.blue};
    border-radius: ${Theme.borders.radiusRound};

    display: flex;
    align-items: center;
    justify-content: flex-start;

    gap: ${Theme.margins.margin1rem};

    padding: ${Theme.margins.margin5px};

    font-size: ${Theme.font.sizes.xsmall};
    color: ${Theme.colors.white};

    img{
        width: 50px;
        height: 50px;
        border-radius: ${Theme.borders.radiusRound};
    }

    > div {
        display: flex;
        gap: ${Theme.margins.margin5px};
    }
`

export { ProfileContainer };

