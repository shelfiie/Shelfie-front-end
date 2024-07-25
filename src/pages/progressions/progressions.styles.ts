import styled from "styled-components";
import { Theme } from "../../styles/theme";

const StatusTag = styled.div`
    background-color: ${Theme.colors.orange};
    color: ${Theme.colors.white};
    border: 1px solid ${Theme.colors.deep};
    border-radius: ${Theme.borders.radius};
`

export { StatusTag }