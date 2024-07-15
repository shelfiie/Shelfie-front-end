import styled from "styled-components"
import { Theme } from "../../styles/theme"

const DivDivisao = styled.div`
 &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: ${Theme.colors.dark};
  }
`

const DivTesteSearch = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0;
  width: 100%;
  border-radius: ${Theme.borders.radius};
  border: ${Theme.borders.border2px} solid ${Theme.colors.deep};
  position: relative;
  margin-right: 1rem;
`

const BookText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  span{
    font-size: ${Theme.font.sizes.xsmall};
    color: ${Theme.colors.lightDark};
  }

  p{
    font-size: ${Theme.font.sizes.xsmall};
    font-weight: ${Theme.font.weight.bold};
    font-family: ${Theme.font.family.poppins};
  }
`

const BookContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 60px;
  }

`

export { DivDivisao, DivTesteSearch, BookText, BookContainer }

