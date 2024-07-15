import { BookResume } from "../../components/BookResume/index.tsx";
import { Layout } from "../layout/index.js";
import { Carrousel, CarrouselTitle, EmptyCarrousel } from "./index.style.ts";
import { useGetUserData } from "../../api/hooks/useGetUserData.ts";
import { useBookSearch } from "../../api/hooks/useBookSearch.ts";

// to do - lista de livros e seus tratamentos

export function Home() {
  const { user } = useGetUserData();
  const { books } = useBookSearch();

  // to do - arrumar o layout que ta esticando
  // to do - arrumar o corte que a div ta fazendo no carrousel
  return (
    <>
      <Layout>
        <CarrouselTitle>Últimas Leituras</CarrouselTitle>
        <button onClick={() => console.log(books)}>Teste</button>
        <Carrousel>
          <BookResume />
          <BookResume />
          <BookResume />
          <BookResume />
          <BookResume />
          <BookResume />
          <BookResume />
          <BookResume />
        </Carrousel>
        {/* <Review /> */}
      </Layout>
    </>
  )
}

