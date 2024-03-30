import styled from "styled-components"
import { Theme } from "../../styles/theme"

export const SearchDropdownWrapper = styled.div`
  position: absolute;
  left: 0; 
  right: -150%; 
  width: auto;

  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  z-index: 100; 

  li{
    list-style-type: none;
    padding: .5rem;
    transition: 300ms ease-in-out;

    display: flex;
    flex-direction: column;

    p{
      font-size: ${Theme.font.sizes.xxsmall};
      font-weight: ${Theme.font.weight.bold};
      font-family: ${Theme.font.family.poppins};
    }

    span{
      font-size: ${Theme.font.sizes.xxsmall};
      color: ${Theme.colors.lightDark};

    }

    &:hover {
      background-color: ${Theme.colors.lightDark};
    }
  }
`
