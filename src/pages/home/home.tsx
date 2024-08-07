import { BookResume } from "../../components/BookResume/book-resume.tsx";
import { Layout } from "../layout/layout.js";
import { Carrousel, BooksWrapper, TabListStyle, TabStyle } from "./home.style.ts";
import { useFetchBooksByUser } from "../../api/hooks/useFetchBooksByUser.ts";
import { Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { BookData } from "../../types/bookData.ts";
import { TabPanelSkeleton } from "./tab-panel-skeleton.tsx";
import { NoItemsFound } from "../../components/globals/NoItemsFound.tsx";

export function Home() {
  const { allBooks, lendo, lidos, queroler, abandonados, isLoading, favoritos } = useFetchBooksByUser();
  const [value, setValue] = useState('1');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const TabPanelContent = ({ items }: { items: BookData[] }) => (
    <Carrousel id="carrossel">
      <BooksWrapper id="books-wrapper">
        {items.length > 0 ? items.map((book) => (
          <BookResume
            key={book.id}
            id={book.id}
            bookId={book.bookId}
            googleId={book.googleId}
            title={book.title}
            thumbnailUrl={book.smallThumbnailUrl}
            smallThumbnailUrl={book.smallThumbnailUrl}
            bookStatus={book.bookStatus} />

        )) : (<NoItemsFound>Você não tem livros nessa lista!</NoItemsFound>)}

      </BooksWrapper>
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
            <Tab sx={TabStyle} label="Favoritos" value='6' />
          </TabList>

          <TabPanel  value='1'>
            {isLoading ? <TabPanelSkeleton /> : <TabPanelContent items={allBooks} />}
          </TabPanel>

          <TabPanel  value='2'>
            {isLoading ? <TabPanelSkeleton /> : <TabPanelContent items={lendo} />}
          </TabPanel>

          <TabPanel  value='3'>
            {isLoading ? <TabPanelSkeleton /> : <TabPanelContent items={lidos} />}
          </TabPanel>

          <TabPanel  value='4'>
            {isLoading ? <TabPanelSkeleton /> : <TabPanelContent items={queroler} />}
          </TabPanel>

          <TabPanel value='5'>
            {isLoading ? <TabPanelSkeleton /> : <TabPanelContent items={abandonados} />}
          </TabPanel>

          <TabPanel value='6'>
            {isLoading ? <TabPanelSkeleton /> : <TabPanelContent items={favoritos} />}
          </TabPanel>

        </TabContext>
      </Layout>
    </>
  )
}

