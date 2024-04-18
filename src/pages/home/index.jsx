import { useEffect, useState } from "react";
import { BookResume } from "../../components/BookResume/index.tsx";
// import { Review } from "../../components/Review/index.jsx";
import { Layout } from "../layout/index.jsx";
import { Carrousel, CarrouselTitle, EmptyCarrousel } from "./index.style.ts";
import { getBookListByUser } from "../../api/getBookData.ts";
// to do - lista de livros e seus tratamentos

export function Home() {
  const [ mouseOver, setMouseOver ] = useState(false);

  const handleMouseOver = () => {
    setMouseOver(true);
  } 

  async function loadUserBooks() {
      const bookList = await getBookListByUser(localStorage.getItem('@Auth:userId'));
      return bookList;
  }

  useEffect(() => {
    loadUserBooks();
  }, [])
  // to do - arrumar o layout que ta esticando
  // to do - arrumar o corte que a div ta fazendo no carrousel
  if(loadUserBooks.length === 0){
      return (
        <Layout>
          {/* to do - mapeamento das listas de leitura e aparecer em  */}
          <CarrouselTitle>Últimas Leituras</CarrouselTitle>
          <Carrousel>
            <EmptyCarrousel>
              Você ainda não tem livros nessa lista.
            </EmptyCarrousel>
          </Carrousel>
        </Layout>
      );
  }
  return (
    <>
      <Layout>
        <CarrouselTitle>Últimas Leituras</CarrouselTitle>
        <Carrousel>
          <BookResume onMouseOver={handleMouseOver} onMouseOut={() => setMouseOver(false)} />
          <BookResume onMouseOver={handleMouseOver} onMouseOut={() => setMouseOver(false)}/>
          <BookResume onMouseOver={handleMouseOver} onMouseOut={() => setMouseOver(false)}/>
          <BookResume onMouseOver={handleMouseOver} onMouseOut={() => setMouseOver(false)}/>
          <BookResume onMouseOver={handleMouseOver} onMouseOut={() => setMouseOver(false)}/>
          <BookResume onMouseOver={handleMouseOver} onMouseOut={() => setMouseOver(false)}/>
          <BookResume onMouseOver={handleMouseOver} onMouseOut={() => setMouseOver(false)}/>
          <BookResume onMouseOver={handleMouseOver} onMouseOut={() => setMouseOver(false)}/>
        </Carrousel>
        {/* <Review /> */}
      </Layout>
    </>
  )
}

