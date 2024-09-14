import Coracao from '../../assets/icons/coracao.png';
import CoracaoPreenchido from '../../assets/icons/coracao-preenchido.png';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { BookService } from '../../api/services/BookService';
import { StatusCode } from '../../api/client/IHttpClient';
import { Alert, Snackbar } from '@mui/material';
import { BookData } from '../../types/bookData';

export const HeartStyle = styled.img`
  width: 20px;
  height: 20px;
  transition: 0.3s ease-in-out;
`;

type HeartProps = {
  bookId?: BookData['bookId'];
  reviewId?: string;
  type: 'book' | 'review';
  refetchReviews?: () => void;
  refetchBooks?: () => void;
  refetchBookDetails?: () => void;
};

export const Heart = ({ bookId, reviewId, type, refetchBooks, refetchReviews, refetchBookDetails }: HeartProps) => {
  const [src, setSrc] = useState(Coracao);
  const [success, setSuccess] = useState<string | null>();
  const [error, setError] = useState<string | null>();
  const bookService = new BookService();

  const [isBookFavorited, setIsBookFavorited] = useState<boolean>();
  const [isReviewFavorited, setIsReviewFavorited] = useState<boolean>();

  let isFavorited: { body?: any };
  const handleIsFavorite = async () => {
    if (type === 'book') {
      if(!bookId) return;
      isFavorited = await bookService.isFavorited(bookId);
      setIsBookFavorited(isFavorited.body === true);
    } else if (type === 'review') {
      if(!reviewId) return;
      isFavorited = await bookService.isReviewLiked(reviewId ?? '');
      setIsReviewFavorited(isFavorited.body.liked === true);
    }
    if (isBookFavorited || isReviewFavorited === true) setSrc(CoracaoPreenchido);
    else setSrc(Coracao);
  };
  useEffect(() => {
    handleIsFavorite();
  }, [isBookFavorited, isReviewFavorited, bookId]); 

  const handleFavorite = async () => {
    let response;
    if (type === 'book') {
      response = await bookService.favoriteBook(bookId);
      if (response.statusCode === StatusCode.Ok) {
        setSuccess(response?.resolve);
        setIsBookFavorited(!isBookFavorited);
        setTimeout(() => {
          refetchBooks && refetchBooks();
          refetchBookDetails && refetchBookDetails();
        }, 1500);

      } else setError(response?.reject);

    } else {
      response = await bookService.likeReview(reviewId ?? '');
      setSuccess(response?.resolve);

      if (response.statusCode >= 200 && response.statusCode < 300) {
        setTimeout(() => {
          refetchReviews && refetchReviews();
        }, 1500);
      } else setError(response?.reject);
    }
  };


  return (
    <>
      <HeartStyle onClick={handleFavorite} src={src} />
      {success && (
        <Snackbar
          open={Boolean(success)}
          onClose={() => setSuccess(null)}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity="success">{success}</Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar
          open={Boolean(error)}
          onClose={() => setError(null)}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </>
  );
};
