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
};

export const Heart = ({ bookId, reviewId, type, refetchBooks, refetchReviews }: HeartProps) => {
  const [src, setSrc] = useState(Coracao);
  const [success, setSuccess] = useState<string | null>();
  const [error, setError] = useState<string | null>();
  const bookService = new BookService();

  let isFavorited: { body?: any };
  const handleIsFavorite = async () => {
    if (type === 'book') {
      isFavorited = await bookService.isFavorited(bookId);
    } else if (type === 'review') {
      isFavorited = await bookService.isReviewLiked(reviewId ?? '');
    }
    if (isFavorited.body.liked || isFavorited.body === true) setSrc(CoracaoPreenchido);
    else setSrc(Coracao);
  };

  useEffect(() => {
    handleIsFavorite();
  }, []); 

  const handleFavorite = async () => {
    let response;
    if (type === 'book') {
      response = await bookService.favoriteBook(bookId);
      if (response.statusCode === StatusCode.Ok) {
        setSuccess(response?.resolve);
        setTimeout(() => {
          refetchBooks && refetchBooks();
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
