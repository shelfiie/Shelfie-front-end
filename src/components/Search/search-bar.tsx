import React, { useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Theme } from "../../styles/theme";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBookSearch } from "../../api/hooks/useBookSearch";
import { Filter } from "./search-filter";
import { DivDivisao, DivTesteSearch } from "./search-bar.styles";
import { BookListItem } from "./book-list-item";
import { BookData } from "../../types/bookData";

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();

  const { books, error, loading } = useBookSearch();
  const [searchParams, setSearchParams] = useSearchParams({ filter: "", search: "" });

  const handleSearchParams = (newParams: { [key: string]: string }) => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, ...newParams }, { replace: true });
  };


  const [inputValue, setInputValue] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedBook, setSelectedBook] = useState<any>(null);


  return (
    <DivTesteSearch>

      <Filter
        setSearchParams={setSearchParams}
        currentParams={Object.fromEntries([...searchParams])}
      />

      <DivDivisao />
      <Autocomplete
        size='small'
        sx={{
          width: '100%', backgroundColor: `${Theme.colors.white}`,
          flex: '6',
          borderStyle: 'none',
          borderRadius: `0 ${Theme.borders.radius} ${Theme.borders.radius} 0 `,
          '& fieldset': {
            border: 'none',
          },
        }}
        disableCloseOnSelect={false}
        value={selectedBook}
        options={books}
        noOptionsText={error ? error : 'Nenhum livro encontrado'}
        getOptionLabel={(option: BookData) => option.title || ''}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
          handleSearchParams({ search: newInputValue });
        }}
        onChange={(_event, newValue) => setSelectedBook(newValue)}
        renderOption={(_props, option: BookData) => {
          return <BookListItem
            key={option.id}
            option={option}
            navigate={navigate} />;
        }}
        renderInput={(params) => <TextField {...params} placeholder="Pesquisar livros" variant="outlined"
          InputLabelProps={{ shrink: false }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }} />}
      />
    </DivTesteSearch>
  )
}