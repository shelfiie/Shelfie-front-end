import { DivSearchBar, DivFilter, InputSearch, DivSearchInput } from "./SearchBar.styles";
import { useState } from "react";
import { fetchBookData } from "../../../hooks/getBookData.ts";
import { SearchDropdown } from "./SearchDropdown.jsx";


export const SearchBar = () => {
const [search, setSearch] = useState("");

const handleChange = async (e) => {
  const { value } = e.target;
  e.preventDefault();

  setSearch(value);

  if (search.length < 2) return;

  const res = fetchBookData(search);
  res.then((data) => {
    console.log(data.items);
  })
}


  return(
    <DivSearchBar>
      <DivFilter>
          <select>
              <option>Tudo</option>
              <option>Título</option>
              <option>Autor</option>
          </select>
      </DivFilter>
      
      <DivSearchInput>
        <InputSearch 
          name="search" 
          id="search" 
          value={search}
          type="text" 
          onChange={handleChange}
          placeholder="Pesquise um livro">
          </InputSearch>

          <SearchDropdown />
      </DivSearchInput>
      
    </DivSearchBar>
  )
}