import { BookResume } from "../../components/BookResume/book-resume.tsx";
import { Layout } from "../layout/index.js";
import { Carrousel, BooksWrapper, TabListStyle, TabStyle } from "./home.style.ts";
import { useFetchBooksByUser } from "../../api/hooks/useFetchBooksByUser.ts";
import { Pagination, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ChangeEvent, useState } from "react";
import { BookData } from "../../types/bookData.ts";
import { TabPanelSkeleton } from "./tab-panel-skeleton.tsx";

export function Home() {
  const { allBooks, lendo, lidos, queroler, abandonados, isLoading, refetch } = useFetchBooksByUser();
  const [value, setValue] = useState('1');
  const itemsPerPage = 10; // Número de itens por página

  const [page, setPage] = useState({
    allBooks: 1,
    lendo: 1,
    lidos: 1,
    queroler: 1,
    abandonados: 1,
  });

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handlePageChange = (category: string, _event: ChangeEvent<unknown>, newPage: number) => {
    setPage(prev => ({ ...prev, [category]: newPage }));
  };

  // Função para calcular os itens a serem exibidos com base na página atual
  const paginatedItems = (items: BookData[], currentPage: number) => {
    const indexLastItem = currentPage * itemsPerPage;
    const indexFirstItem = indexLastItem - itemsPerPage;
    return items.slice(indexFirstItem, indexLastItem);
  };

  const TabPanelContent = ({ items, page, category }: { items: BookData[], page: number, category: string }) => (
    <Carrousel id="carrossel">
      <BooksWrapper id="books-wrapper">
        {items.length > 0 ? paginatedItems(items, page).map((book) => (
          <BookResume
            key={book.id}
            id={book.id}
            bookId={book.bookId}
            googleId={book.googleId}
            title={book.title}
            thumbnailUrl={book.smallThumbnailUrl}
            smallThumbnailUrl={book.smallThumbnailUrl}
            bookStatus={book.bookStatus}
            refetch={refetch} />

        )) : (<p>Você não tem livros nessa lista</p>)}
        
      </BooksWrapper>
      <Pagination style={{alignSelf: 'center'}}
        count={Math.ceil(items.length / itemsPerPage)}
        page={page}
        onChange={(event, newPage) => handlePageChange(category, event, newPage)}
      />
    </Carrousel>
  );

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
            {isLoading ? <TabPanelSkeleton /> : <TabPanelContent items={allBooks} page={page.allBooks} category="allBooks" />}
          </TabPanel>

          <TabPanel sx={{ height: '100%' }} value='2'>
            {isLoading ? <TabPanelSkeleton /> : <TabPanelContent items={lendo} page={page.lendo} category="lendo" />}
          </TabPanel>

          <TabPanel sx={{ height: '100%' }} value='3'>
            {isLoading ? <TabPanelSkeleton /> : <TabPanelContent items={lidos} page={page.lidos} category="lidos" />}
          </TabPanel>

          <TabPanel sx={{ height: '100%' }} value='4'>
            {isLoading ? <TabPanelSkeleton /> : <TabPanelContent items={queroler} page={page.queroler} category="queroler" />}
          </TabPanel>

          <TabPanel sx={{ height: '100%' }} value='5'>
            {isLoading ? <TabPanelSkeleton /> : <TabPanelContent items={abandonados} page={page.abandonados} category="abandonados" />}
          </TabPanel>

        </TabContext>
      </Layout>
    </>
  )
}

