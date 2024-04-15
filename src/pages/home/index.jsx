import { useEffect, useState } from "react";
import { BookResume } from "../../components/BookResume/index.tsx";
import { Review } from "../../components/Review/index.jsx";
import { Layout } from "../layout/index.jsx";
import { Carrousel, CarrouselTitle } from "./index.style.ts";
// to do - lista de livros e seus tratamentos

export function Home() {
  const [ mouseOver, setMouseOver ] = useState(false);

  const handleMouseOver = () => {
    setMouseOver(true);
  } 

  useEffect(() => {
    if (mouseOver) {
      
    }
  }, [mouseOver]);

  // to do - arrumar o layout que ta esticando
  // to do - arrumar o corte que a div ta fazendo no carrousel
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

