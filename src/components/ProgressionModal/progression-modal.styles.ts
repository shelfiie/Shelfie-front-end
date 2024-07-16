import styled from "styled-components";
import { Theme } from "../../styles/theme";

const ButtonsDiv = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1rem;
    width: 100%;
`

const ProgressionSpan = styled.span`
    font-family: ${Theme.font.sizes.xxsmall};
    color: ${Theme.colors.lightDark};
`

const ProgressionForm = styled.form`
    height: 100%;
    display: grid;
    gap: ${Theme.margins.margin1rem};
`

export { ButtonsDiv, ProgressionSpan, ProgressionForm }