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
};

export const Heart = ({ bookId, reviewId, type }: HeartProps) => {
  const [src, setSrc] = useState(Coracao);
  const [success, setSuccess] = useState<string | null>();
  const [error, setError] = useState<string | null>();
  const bookService = new BookService();

  const handleIsFavorite = async () => {
    let isFavorited;
    if (type === 'book') {
      isFavorited = await bookService.isFavorited(bookId);
    } else {
      return
      isFavorited = await bookService.isFavorited(bookId);
    }
    if (isFavorited.body === true) setSrc(CoracaoPreenchido);
    else setSrc(Coracao);
  };

  useEffect(() => {
    handleIsFavorite();
  }, [bookId, type]);

  const handleFavorite = async () => {
    let response;
    if (type === 'book') {
      response = await bookService.favoriteBook(bookId);
    } else {
      response = await bookService.likeReview(reviewId ?? '');
    }

    if (response.statusCode === StatusCode.Created) setSuccess(response?.resolve);
    else setError(response?.reject);
  };

  return (
    <>
      <HeartStyle onClick={handleFavorite} src={src} />
      {success && (
        <Snackbar
          open={true}
          onClose={() => setSuccess(null)}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity="success">{success}</Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar
          open={true}
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
