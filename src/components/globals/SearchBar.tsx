import styled from "styled-components";
import {Theme} from "../../styles/theme.ts";

const DivSearchBar = styled.div`
  position: absolute;
  top: -1rem;
  left: 1rem;
  gap: 1rem;
  display: flex;
  border-radius: ${Theme.margins.marginhalfrem};
  border: ${Theme.borders.border2px} solid ${Theme.colors.deep};
  background-color: #fff;

`

const DivFilter = styled.div`
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

  &:focus{outline: none;}
`
export const SearchBar = () => {
    return(
        <DivSearchBar>
            <DivFilter>
                <select>
                    <option>Tudo</option>
                    <option>Título</option>
                    <option>Autor</option>
                </select>
            </DivFilter>
            <InputSearch type="text" placeholder="Pesquise um livro" />
        </DivSearchBar>
    )
}