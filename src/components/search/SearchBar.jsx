import React, { useEffect, useRef, useState } from "react";
import { fetchBookDataByTitle } from "../../api/getBookData.ts";
import { useClickFocus } from "../../hooks/clickFocusInput.ts";
import { useClickOutside } from "../../hooks/clickOutside.ts";
import { DivFilter, DivSearchBar, InputSearch, InputWrapper } from "./SearchBar.styles.ts";
import { SearchResults } from "./SearchResults.jsx";
import styled from "styled-components";

const Option = styled.option`
  color: #000;
  background-color: #fff;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
`;

export const SearchBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const searchInputRef = useRef(null);

  useClickOutside(searchInputRef, () => setIsVisible(false));
  useClickFocus(searchInputRef, () => setIsVisible(true));

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = async (e) => {
    const { value } = e.target;
    e.preventDefault();

    setSearch(value);
  };

  useEffect(() => {
    const trimmedSearch = search.trim();
    if (!trimmedSearch || trimmedSearch.length < 3) {
      setResults([]);
      return;
    }

    const res = fetchBookDataByTitle(search);
    res.then((data) => {
      setResults(data.items);
    });
  }, [search]);


  return (
    <DivSearchBar>
      <DivFilter>
        <select>
          <Option>Tudo</Option>
          {/* <option>Título</option>
          <option>Autor</option> */}
        </select>
      </DivFilter>

      <InputWrapper>
        <InputSearch
          ref={searchInputRef}
          name="search"
          id="search"
          value={search}
          type="text"
          onChange={handleChange}
          placeholder="Pesquise um livro">  
        </InputSearch>

        <SearchResults isVisible={isVisible} data={results} />
      </InputWrapper>

    </DivSearchBar>
  )
}