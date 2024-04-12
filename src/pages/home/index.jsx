import { BookResume } from "../../components/BookResume/index.tsx";
import { Review } from "../../components/Review/index.jsx";
import { Layout } from "../layout/index.jsx";
import { Carrousel } from "./index.style.ts";
// to do - lista de livros e seus tratamentos

export function Home() {

  // to do - arrumar o layout que ta esticando
  // to do - arrumar o corte que a div ta fazendo no carrousel
  return (
    <>
      <Layout>
        <h2>Últimas Leituras</h2>
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

