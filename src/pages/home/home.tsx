import { BookResume } from "../../components/BookResume/book-resume.tsx";
import { Layout } from "../layout/index.js";
import { Carrousel, BooksWrapper, TabListStyle, TabStyle } from "./home.style.ts";
import { useFetchBooksByUser } from "../../api/hooks/useFetchBooksByUser.ts";
import { Pagination, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ChangeEvent, useState } from "react";
import { BookData } from "../../types/bookData.ts";

export function Home() {
  const { allBooks, lendo, lidos, queroler, abandonados, isLoading } = useFetchBooksByUser();
  const [value, setValue] = useState('1');

  const itemsPerPage = 8; // Número de itens por página
  const [page, setPage] = useState({
    allBooks: 1,
    lendo: 1,
    lidos: 1,
    queroler: 1,
    abandonados: 1,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handlePageChange = (category: string, event: ChangeEvent<unknown>, newPage: number) => {
    setPage(prev => ({ ...prev, [category]: newPage }));
  };

  // Função para calcular os itens a serem exibidos com base na página atual
  const paginatedItems = (items: BookData[], currentPage: number) => {
    const indexLastItem = currentPage * itemsPerPage;
    const indexFirstItem = indexLastItem - itemsPerPage;
    return items.slice(indexFirstItem, indexLastItem);
  };


  return (

    <>
      <Layout>
        <TabContext value={value}>
          <TabList sx={TabListStyle} onChange={handleChange}>
            <Tab id="tab" sx={TabStyle} label="Todos" value='1' />
            <Tab sx={TabStyle} label="Lendo" value='2' />
            <Tab sx={TabStyle} label="Lidos" value='3' />
            <Tab sx={TabStyle} label="Quero Ler" value='4' />
            <Tab sx={TabStyle} label="Abandonados" value='5' />
          </TabList>

          <TabPanel sx={{ height: '100%' }} value='1'>
            <Carrousel id="carrossel">
              <BooksWrapper id="books-wrapper">
                {paginatedItems(allBooks, page.allBooks).map((book) => (
                  <BookResume id={book.bookId} myBookId={book.id} status={book.bookStatus} />
                ))}
              </BooksWrapper>
              <Pagination
                count={Math.ceil(allBooks.length / itemsPerPage)}
                page={page.allBooks}
                onChange={(event, newPage) => handlePageChange('allBooks', event, newPage)}
              />
            </Carrousel>
          </TabPanel>

          <TabPanel sx={{ height: '100%' }} value='2'>
            <Carrousel id="carrossel">
              <BooksWrapper id="books-wrapper">
                {paginatedItems(lendo, page.lendo).map((book) => (
                  <BookResume id={book.bookId} myBookId={book.id} status={book.bookStatus} />
                ))}
              </BooksWrapper>
              <Pagination
                count={Math.ceil(lendo.length / itemsPerPage)}
                page={page.lendo}
                onChange={(event, newPage) => handlePageChange('lendo', event, newPage)}
              />
            </Carrousel>
          </TabPanel>

          <TabPanel sx={{ height: '100%' }} value='3'>
            <Carrousel id="carrossel">
              <BooksWrapper id="books-wrapper">
                {lidos.length > 0 ? lidos.map((book) => (
                  <BookResume id={book.bookId} myBookId={book.id} status={book.bookStatus} />
                )) : (<p>Você não tem livros nessa lista</p>)}
              </BooksWrapper>
              <Pagination
                count={Math.ceil(lendo.length / itemsPerPage)}
                page={page.lendo}
                onChange={(event, newPage) => handlePageChange('lendo', event, newPage)}
              />
            </Carrousel>
          </TabPanel>

          <TabPanel sx={{ height: '100%' }} value='4'>
            <Carrousel id="carrossel">
              <BooksWrapper id="books-wrapper">
                {queroler.length > 0 ? queroler.map((book) => (
                  <BookResume id={book.bookId} myBookId={book.id} status={book.bookStatus} />
                )) : (<p>Você não tem livros nessa lista</p>)}
              </BooksWrapper>
              <Pagination
                count={Math.ceil(lendo.length / itemsPerPage)}
                page={page.lendo}
                onChange={(event, newPage) => handlePageChange('lendo', event, newPage)}
              />
            </Carrousel>
          </TabPanel>

          <TabPanel sx={{ height: '100%' }} value='5'>
            <Carrousel>
              <BooksWrapper id="books-wrapper">
                {abandonados.length > 0 ? abandonados.map((book) => (
                  <BookResume id={book.bookId} myBookId={book.id} status={book.bookStatus} />
                )) : (<p>Você não tem livros nessa lista</p>)}
              </BooksWrapper>
              <Pagination
                count={Math.ceil(lendo.length / itemsPerPage)}
                page={page.lendo}
                onChange={(event, newPage) => handlePageChange('lendo', event, newPage)}
              />
            </Carrousel>
          </TabPanel>

        </TabContext>
      </Layout>
    </>
  )
}

