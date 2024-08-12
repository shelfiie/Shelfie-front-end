import { useNavigate, useParams } from 'react-router-dom';
import { Botao } from '../../components/globals/Button.style';
import { Theme } from '../../styles/theme';
import { Layout } from '../layout/layout';
import { BookContent, BookDescription, BoxBook, ComplementaryDetails, PageCount, UserBookDetails, BookCoverImage, TitleWrapper } from './book-details-styles';
import { Heart } from '../../components/globals/Heart.style'
import { useGBookById } from '../../api/hooks/useGBookById';
import { useEffect, useState } from 'react';
import { DropDownSelection } from '../../components/DropDownSelection/dropdown-selection';
import { useBookDetails } from '../../api/hooks/useBookDetails';
import { StatusTag } from '../progressions/progressions.styles';
import { ProgressionModal } from '../../components/ProgressionModal/progression-modal';
import { ReviewModal } from '../../components/Review/review';
import { Tooltip } from '@mui/material';
import { filterBookStatus } from '../../utils/filters';
import { BookDetailsSkeleton } from './book-details-skeleton';
import { BookStatus } from '../../types/bookData';
import { ReviewsCard } from '../reviews/reviews-card';
import { ProfilerReviews } from '../profile/profile-styles';
import { useFetchReviewsByBookId } from '../../api/hooks/useFetchReviewsByBookId';

export const BookDetails = () => {
  const { id } = useParams();

  const { book, loading } = useGBookById(id ?? '');

  const { page, bookStatus, bookId, refetchBookDetails } = useBookDetails(id);

  const { reviews, loading: reviewsLoading, refetchReviews } = useFetchReviewsByBookId(bookId);

  useEffect(() => {
    if (bookId) {
      refetchReviews && refetchReviews();
    }
  }, [bookId])

  const reviewsCombined = reviews?.map((review) => {
    return {
      ...review,
      title: book?.title,
      thumbnailUrl: book?.thumbnailUrl,
      smallThumbnailUrl: book?.smallThumbnailUrl,
    };
  });

  const sortedReviews = reviewsCombined && reviewsCombined.sort((a, b) => {
    const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('filter');
    searchParams.delete('search');
    navigate(`${window.location.pathname}?${searchParams.toString()}`, { replace: true });
  }, [navigate]);

  const [isOpen, setIsOpen] = useState(false);
  const [reviewIsOpen, setReviewIsOpen] = useState(false);
  const handleProgressionModal = () => setIsOpen(!isOpen);
  const handleReviewModal = () => setReviewIsOpen(!reviewIsOpen);

  if (loading) {
    return <Layout><BookDetailsSkeleton /> </Layout>;
  }

  return (
    <Layout>
      <BoxBook
        shadowcolor='none'
        padding={Theme.margins.margin1rem}
        backgroundcolor={Theme.colors.blue}>

        <BookCoverImage src={book?.thumbnailUrl} alt="book cover" />

        <BookContent>
          <div>
            <TitleWrapper>
              <h1>{book?.title}</h1>
              {bookStatus ? <StatusTag>{filterBookStatus(bookStatus)}</StatusTag> : null}
            </TitleWrapper>
            <p>Autor(a): {book?.authors}</p>
          </div>

          <ComplementaryDetails>
            <p>Editora: {book?.publisher}</p>
            <p>Data de publicação: {book?.publishedDate}</p>
            <p>ISBN 10: {book?.isbn10}</p>
            <p>ISBN 13: {book?.isbn13}</p>
          </ComplementaryDetails>

          <BookDescription>
            <span>Descrição</span>
            <p>{book?.description}</p>
          </BookDescription>

          <UserBookDetails>
            <div>
              <PageCount>
                {page}/{book?.pageCount}
              </PageCount>

              <DropDownSelection
                refreshBookDetails={refetchBookDetails}
                googleId={book?.googleId}
                content='SELECIONAR'
              />
            </div>

            <div>
              <Heart type='book' bookId={bookId} />
              {bookStatus === BookStatus.LENDO || bookStatus === BookStatus.QUERO_LER ? (
                <Botao
                  backgroundColor={Theme.colors.blue}
                  color={Theme.colors.light}
                  fontSize={Theme.font.sizes.xsmall}
                  padding='.5rem 1rem'
                  borderRadius={Theme.borders.radius}
                  width={Theme.margins.margin5rem}
                  onClick={handleProgressionModal}
                >
                  Ler
                </Botao>
              ) :
                <Tooltip title='Deve estar na lista lendo'>
                  <span>
                    <Botao
                      backgroundColor={Theme.colors.blue}
                      color={Theme.colors.light}
                      fontSize={Theme.font.sizes.xsmall}
                      padding='.5rem 1rem'
                      borderRadius={Theme.borders.radius}
                      width={Theme.margins.margin5rem}
                      onClick={handleProgressionModal}
                      isError={true}
                      disabled
                    >
                      Ler
                    </Botao>
                  </span>
                </Tooltip>}

              <ProgressionModal refetchPages={refetchBookDetails} bookId={bookId} googleId={book?.googleId} isOpen={isOpen} handleModal={handleProgressionModal} title={book?.title} key={book?.bookId} />

              {bookStatus === BookStatus.LIDO || bookStatus === BookStatus.ABANDONADO ? (
                <Botao
                  backgroundColor={Theme.colors.pink}
                  color={Theme.colors.light}
                  fontSize={Theme.font.sizes.xsmall}
                  padding='.5rem 1rem'
                  borderRadius={Theme.borders.radius}
                  width={Theme.margins.margin7rem}
                  onClick={handleReviewModal}
                >
                  Review
                </Botao>
              ) :
                <Tooltip title='Deve estar na lista lido ou abandonado'>
                  <span>
                    <Botao
                      backgroundColor={Theme.colors.pink}
                      color={Theme.colors.light}
                      fontSize={Theme.font.sizes.xsmall}
                      disabled
                      padding='.5rem 1rem'
                      borderRadius={Theme.borders.radius}
                      width={Theme.margins.margin7rem}
                      onClick={handleReviewModal}
                      isError={true}
                    >
                      Review
                    </Botao>
                  </span>
                </Tooltip>
              }
              <ReviewModal
                refreshBookDetails={refetchBookDetails}
                isEditing={false}
                isOpen={reviewIsOpen}
                handleModal={handleReviewModal}
                bookId={bookId}
                title={book?.title}
                key={book?.bookId} />
            </div>
          </UserBookDetails>
        </BookContent>
      </BoxBook>

      <div>
        <h2>Últimas avaliações</h2>
        <p>Veja abaixo o que os leitores que já leram esse livro acharam dele!</p>
      </div>

      {reviews &&
        reviewsLoading ? <BookDetailsSkeleton /> :
        <ProfilerReviews>
          {sortedReviews?.map((review, index) => (
              <ReviewsCard
                key={index}
                review={review}
                isEditable={false}
                isLikable={true}
              />
          ))}
        </ProfilerReviews>
      }
    </Layout>
  );
};