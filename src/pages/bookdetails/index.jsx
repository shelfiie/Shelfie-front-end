import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookById } from '../../api/getBookData';
import { Botao } from '../../components/globals/Button.style';
import { Theme } from '../../styles/theme';
import { Layout } from '../layout/index';
import { BookContent, BookDescription, BoxBook, ComplementaryDetails, PageCount, UserBookDetails } from './index.styles';

export const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        const data = await fetchBookById(id);
        setBookDetails(data);
      } catch (error) {
        console.error('Erro ao obter detalhes do livro:', error);
      }
    };

    getBookDetails();
  }, [id]);

  if (!bookDetails) {
    return <Layout>Carregando detalhes do livro...</Layout>;
  }

  let authorsText = '';
  if (Array.isArray(bookDetails.authors)) {
    authorsText = bookDetails.authors.join(', ');
  } else if (!bookDetails.authors) {
    authorsText = 'Autor não informado';
  } else {
    authorsText = bookDetails.authors;
  }

  return (
    <Layout>
      <BoxBook
        shadowcolor='none'
        padding={Theme.margins.margin1rem}
        backgroundcolor={Theme.colors.blue}>

          <img src={bookDetails.thumbnail} alt="" />

        <BookContent>
          <div>
            <h1>{bookDetails.title}</h1>
            <p>Autor(a): {authorsText}</p>
          </div>

          <ComplementaryDetails>
            <p>Editora: {bookDetails.publisher}</p>
            <p>Ano de publicação: {bookDetails.publishedDate}</p>
            <p>ISBN 10: {bookDetails.isbn10}</p>
            <p>ISBN 13: {bookDetails.isbn13}</p>
          </ComplementaryDetails>

          <BookDescription>
            <span>Descrição</span>
            {/* //to do - desestruturar */}
            <p>{bookDetails.description}</p>
          </BookDescription>

          {/* // to do - nao deixar clicar no botao ler enquanto n colocou na lista de quero ler e lendo e não deixar fazer o review enquanto nao abandonou ou terminou (esperar chamado da api) */}
          <UserBookDetails>
            <PageCount>
              0/{bookDetails.pageCount}
            </PageCount>

            <select>
              <option>SELECIONAR</option>
            </select>

            <Botao
              content='Ler'
              backgroundcolor={Theme.colors.blue}
              color={Theme.colors.light}
              fontSize={Theme.font.sizes.xsmall}
              padding='1rem 2rem' 
            />  
            <Botao
              content='Review'
              backgroundcolor={Theme.colors.pink}
              color={Theme.colors.light}
              fontSize={Theme.font.sizes.xsmall}
              disabled={true}
            />
          </UserBookDetails>

        </BookContent>
      </BoxBook>
    </Layout>
  );
};

