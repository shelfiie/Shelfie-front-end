import { Review } from "../../components/Review/index.jsx";
import { Layout } from "../layout/index.jsx";

// to do - lista de livros e seus tratamentos

export function Home() {
  return (
    <>
      <Layout>
        <h1>Home</h1>
        <br />
        <div>
          <ul>
            <li>livro 1</li>
            <li>livro 2</li>
            <li>livro 3</li>
          </ul>
        </div>
        <Review />
      </Layout>
    </>
  )
}

