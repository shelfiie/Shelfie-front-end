import styled from "styled-components";
import { Theme } from "../../styles/theme";

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
    margin-top: ${Theme.margins.margin1rem};
`

const BookNumber = styled.p`
    font-weight: ${Theme.font.weight.bold};
    font-size: ${Theme.font.sizes.regular};
    margin: auto 5px;
`

export { SettingsImageProfile, TesteSettings, UserInformation, PhotoWrapper, UserContent, BookNumber }