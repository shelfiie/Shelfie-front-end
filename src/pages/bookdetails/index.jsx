import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookById } from '../../api/getBookData';
import { Botao } from '../../components/globals/Button.style';
import { Theme } from '../../styles/theme';
import { Layout } from '../layout/index';
import { BookContent, BookDescription, BoxBook, BoxBookImage, ComplementaryDetails, PageCount, UserBookDetails } from './index.styles';

export const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        const data = await fetchBookById(id);
        console.log(data);
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

  const date = new Date(bookDetails.volumeInfo.publishedDate).toLocaleDateString('pt-BR', { year: 'numeric' });

  let authorsText = '';
  if (Array.isArray(bookDetails.volumeInfo.authors)) {
    authorsText = bookDetails.volumeInfo.authors.join(', ');
  } else if (!bookDetails.volumeInfo.authors) {
    authorsText = 'Autor não informado';
  } else {
    authorsText = bookDetails.volumeInfo.authors;
  }

  return (
    <Layout>
      <BoxBook
        shadowcolor='none'
        padding={Theme.margins.margin1rem}
        backgroundcolor={Theme.colors.blue}>

        <BoxBookImage
          padding={Theme.margins.margin1rem}
          backgroundcolor={Theme.colors.light}>
          <img src={bookDetails.volumeInfo.imageLinks.thumbnail} alt="" />
        </BoxBookImage>

        <BookContent>
          <div>
            <h1>{bookDetails.volumeInfo.title}</h1>
            <p>Autor(a): {authorsText}</p>
          </div>

          <ComplementaryDetails>
            <p>Editora: {bookDetails.volumeInfo.publisher}</p>
            <p>Ano de publicação: {date}</p>
            <p>ISBN 10: TO DO</p>
            <p>ISBN 13: TO DO</p>
          </ComplementaryDetails>

          <BookDescription>
            <span>Descrição</span>
            {/* //to do - desestruturar */}
            <p>{bookDetails.volumeInfo.description.replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/<br>/g, '')}</p>
          </BookDescription>

          {/* // to do - nao deixar clicar no botao ler enquanto n colocou na lista de quero ler e lendo e não deixar fazer o review enquanto nao abandonou ou terminou (esperar chamado da api) */}
          <UserBookDetails>
            <PageCount>
              0/{bookDetails.volumeInfo.pageCount}
            </PageCount>

            <select>
              <option>SELECIONAR</option>
            </select>

            <Botao
              content='Ler'
              backgroundcolor={Theme.colors.blue}
              color={Theme.colors.light}
              fontsize={Theme.font.sizes.xsmall}
              padding='1rem 2rem' 
            />  
            <Botao
              content='Review'
              backgroundcolor={Theme.colors.pink}
              color={Theme.colors.light}
              fontsize={Theme.font.sizes.xsmall}
              disabled={true}
            />
          </UserBookDetails>

        </BookContent>
      </BoxBook>
    </Layout>
  );
};

