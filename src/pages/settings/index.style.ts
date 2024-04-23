import styled from "styled-components";
import { Theme } from "../../styles/theme";

const SettingsImageProfile = styled.img`
    width: 100px;
    border-radius: ${Theme.borders.radius};
`
const UserInformation = styled.div`
    display: inline-flex;
    width: 100%;

    gap: ${Theme.margins.margin1rem};
`

const TesteSettings = styled.div`
    background-color: red;
    width: 100px;
`


export { SettingsImageProfile, TesteSettings, UserInformation }