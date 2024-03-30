import React, { useEffect, useRef, useState } from "react";
import { fetchBookData } from "../../api/getBookData.ts";
import { useClickFocus } from "../../hooks/clickFocusInput.ts";
import { useClickOutside } from "../../hooks/clickOutside.ts";
import { DivFilter, DivSearchBar, DivSearchInput, InputSearch } from "./SearchBar.styles.ts";
import { SearchResults } from "./SearchResults.jsx";


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

    const res = fetchBookData(search);
    res.then((data) => {
      setResults(data.items.slice(0, 5));
    });
  }, [search]);


  return (
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
          ref={searchInputRef}
          name="search"
          id="search"
          value={search}
          type="text"
          onChange={handleChange}
          placeholder="Pesquise um livro">  
        </InputSearch>

        <SearchResults isVisible={isVisible} data={results} />
      </DivSearchInput>

    </DivSearchBar>
  )
}