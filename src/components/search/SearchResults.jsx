import React from "react";
import { useNavigate } from "react-router-dom";
import { SearchDropdownWrapper } from "./SearchResults.styles";

export const SearchResults = ({ isVisible, data }) => {
  const navigate = useNavigate();

  if (!isVisible || !data || !data.length) return null;

  const resultList = data.map((item) => {
    const date = new Date(item.volumeInfo.publishedDate).toLocaleDateString('pt-BR', { year: 'numeric' });

    let authorsText = '';

    if (Array.isArray(item.volumeInfo.authors)) {
      authorsText = item.volumeInfo.authors.join(', ');
    } if (!item.volumeInfo.authors) authorsText = 'Autor não informado';
    else {
      authorsText = item.volumeInfo.authors;
    }

    return <li 
      key={item.id} 
      onClick={ () =>{
        navigate(`/Shelfie-front-end/bookdetails/${item.id}`)
      }}>
      <p>{item.volumeInfo.title}</p>
      <span>Autor: {authorsText}</span>
      <span>Ano de publicação: {date}</span>
    </li>;
  });

  return (
    <SearchDropdownWrapper>
      <ul>{resultList}</ul>
    </SearchDropdownWrapper>
  );
};
