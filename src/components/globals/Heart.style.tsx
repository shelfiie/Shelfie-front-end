import Coracao from '../../assets/icons/coracao.png';
import CoracaoPreenchido from '../../assets/icons/coracao-preenchido.png';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { BookData } from '../../types/bookData';
import { BookService } from '../../api/services/BookService';
import { StatusCode } from '../../api/client/IHttpClient';
import { Alert, Snackbar } from '@mui/material';

export const HeartStyle = styled.img`
  width: 20px;
  height: 20px;
  transition: 0.3s ease-in-out;
`;

type HeartProps = {
  bookId?: BookData['bookId'];
  reviewId?: string;
}

export const Heart = ({ bookId, reviewId }: HeartProps) => {
  const [src, setSrc] = useState(Coracao);
  const [success, setSuccess] = useState<string | null>();
  const [error, setError] = useState<string | null>();
  const service = new BookService();

  const handleIsFavorite = async () => {
    const isFavorited = await service.isFavorited(bookId);
    if (isFavorited.body === true) setSrc(CoracaoPreenchido);
    else setSrc(Coracao);
  };

  useEffect(() => {
    handleIsFavorite();
  });

  const handleFavorite = async () => {

    const response = bookId ? await service.favoriteBook(bookId) : await service.likeReview(reviewId ?? '');

    if (response.statusCode === StatusCode.Ok) setSuccess(response?.resolve);
    else setError(response?.reject);

  }

  return (
    <>
      <HeartStyle
        onClick={handleFavorite}
        src={src}
      />
      {success && <Snackbar open={true} onClose={() => setSuccess(null)} autoHideDuration={4000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success">{success}</Alert>
      </Snackbar>}
      {error && <Snackbar open={true} onClose={() => setError(null)} autoHideDuration={4000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>}
    </>
  )
}