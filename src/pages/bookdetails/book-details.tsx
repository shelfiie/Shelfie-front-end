import { useNavigate, useParams } from 'react-router-dom';
import { DropDownSelection, MUIDropDown } from '../../components/DropDownSelection/dropdown-selection';
import { Botao } from '../../components/globals/Button.style';
import { Theme } from '../../styles/theme';
import { Layout } from '../layout/index';
import { BookContent, BookDescription, BoxBook, Carregando, ComplementaryDetails, PageCount, UserBookDetails, BookCoverImage } from './book-details-styles';
import { Heart } from '../../components/globals/Heart.style'
import { useGBookById } from '../../api/hooks/useGBookById';
import { useEffect } from 'react';
import { bookOptions } from '../../api/hooks/useBookStatus';
import { BookService } from '../../api/services/BookService';

// refactor pelo amor de deus q nem eu to entendendo mais
export const BookDetails = () => {
  const { id } = useParams();
  const { book } = useGBookById(id ?? '');
  const navigate = useNavigate();

  const handleGetBookStatus = () => {
    const service = new BookService();
    service.postBookStatus(book?.googleId).then((response) => {
      console.log(response);
    });
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('filter');
    searchParams.delete('search');
    navigate(`${window.location.pathname}?${searchParams.toString()}`, { replace: true });
  }, [navigate]);

  if (!book) {
    return <Layout><Carregando>Carregando detalhes do livro...</Carregando></Layout>;
  }

  return (
    <Layout>
      <BoxBook
        shadowcolor='none'
        padding={Theme.margins.margin1rem}
        backgroundcolor={Theme.colors.blue}>

        <BookCoverImage src={book.thumbnail} alt="book cover" />

        <BookContent>
          <div>
            <h1>{book.title}</h1>
            <p>Autor(a): {book.authors}</p>
          </div>

          <ComplementaryDetails>
            <p>Editora: {book.publisher}</p>
            <p>Data de publicação: {book.publishedDate}</p>
            <p>ISBN 10: {book.isbn10}</p>
            <p>ISBN 13: {book.isbn13}</p>
          </ComplementaryDetails>

          <BookDescription>
            <span>Descrição</span>
            <p>{book.description}</p>
          </BookDescription>

          {/* // to do - nao deixar clicar no botao ler enquanto n colocou na lista de quero ler e lendo e não deixar fazer o review enquanto nao abandonou ou terminou (esperar chamado da api) */}
          <UserBookDetails>
            <div>
              <PageCount>
                0/{book.pageCount}
              </PageCount>

              <DropDownSelection
                backgroundcolor={Theme.colors.orange}
                content='SELECIONAR'
                color={Theme.colors.white}
                options={bookOptions}
                fontSize={Theme.font.sizes.xsmall}
              />
            </div>

            <div>
              <Heart />
              <Botao
                backgroundColor={Theme.colors.blue}
                color={Theme.colors.light}
                fontSize={Theme.font.sizes.xsmall}
                padding='.5rem 1rem'
                borderRadius={Theme.borders.radius}
                width={Theme.margins.margin5rem}
              >
                Ler
              </Botao>
              <Botao
                backgroundColor={Theme.colors.pink}
                color={Theme.colors.light}
                fontSize={Theme.font.sizes.xsmall}
                disabled={true}
                padding='.5rem 1rem'
                borderRadius={Theme.borders.radius}
                width={Theme.margins.margin7rem}
              >
                Review
              </Botao>
            </div>
          </UserBookDetails>
        </BookContent>
      </BoxBook>
      <MUIDropDown googleId={book.googleId ?? ''} />
      <button onClick={handleGetBookStatus}> teste </button>

    </Layout>
  );
};

