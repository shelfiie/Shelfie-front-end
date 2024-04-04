import styled from "styled-components"
import { Theme } from "../../styles/theme"

const DivSearchBar = styled.div`
  gap: 1rem;

  display: inherit;
  align-items: center;
  
  border-radius: ${Theme.borders.radius};
  border: ${Theme.borders.border2px} solid ${Theme.colors.deep};
  background-color: #fff;

  width: 40%;

`

const DivFilter = styled.div`
  position: relative;
  select{
    border-radius: ${Theme.margins.marginhalfrem};
    border-style: none;

    padding: ${Theme.margins.marginhalfrem};

    box-shadow: none;

    font-family: ${Theme.font.family.poppins};
    font-weight: ${Theme.font.weight.bold}; 

    option{
        outline: none;
        text-align: left;
    }
    
    &:focus{outline: none;}
  }
  &::after{
      content: "";
      position: absolute;
      width: 2px;
      height: 100%;
      background-color: ${Theme.colors.lightDark};
      margin-left: 4px;
  }
`

const InputSearch = styled.input`
  border-style: none;
  border-radius: ${Theme.margins.marginhalfrem};

  height: 100%;
  width: 100%;

  &:focus{outline: none;}
`

const InputWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

export { DivFilter, DivSearchBar, InputSearch, InputWrapper }

