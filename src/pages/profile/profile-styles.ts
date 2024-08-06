import styled from "styled-components";
import { Theme } from "../../styles/theme";
import { BoxesWrappers } from "../reviews/reviews-box.styles";

const SettingsImageProfile = styled.img`
    width: 100px;
    border-radius: ${Theme.borders.radiusRound};
`
const UserInformation = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    background-color: ${Theme.colors.blue};
    color: ${Theme.colors.white};
    gap: ${Theme.margins.margin1rem};
    padding: ${Theme.margins.margin1rem};
    border-radius: ${Theme.borders.radius};
`

const TesteSettings = styled.div`
    background-color: red;
    width: 100px;
`

const PhotoWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    gap: ${Theme.margins.margin1rem};
`

const UserContent = styled.div`
    display: flex;
    gap: 1rem;
    margin: ${Theme.margins.margin1rem} 0;
`

const BookNumber = styled.p`
    font-weight: ${Theme.font.weight.bold};
    font-size: ${Theme.font.sizes.regular};
    margin: auto 5px;
`

const ProfilerReviews = styled(BoxesWrappers)`
    height: min-content;
    grid-auto-columns: max-content;
    grid-template-columns: repeat(1, min-content);
    display: grid;
    gap: 1rem;
    
    #box-wrapper {
        width: 400px;
        height: 220px;

    }

    #review-date {font-size: ${Theme.font.sizes.xsmall}}
    p {font-size: ${Theme.font.sizes.xsmall}}
    img {
        height: 150px;
        border-radius: ${Theme.borders.radius};
    }
    `

const ProfileBookInfo = styled.div`
    h2 {
        margin: ${Theme.margins.margin1rem} 0;
    }
    display: grid;
    grid-template-columns: 1fr 1fr;
`

export { SettingsImageProfile, TesteSettings, UserInformation, PhotoWrapper, UserContent, BookNumber, ProfilerReviews, ProfileBookInfo }