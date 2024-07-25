import { useState } from 'react';
import { Theme } from '../../styles/theme.ts';
import { Botao } from '../globals/Button.style.tsx';
import { ButtonWrapper, ResumeTitle, StyledBookCover, StyledBookResumeContainer, StyledOptions } from './book-resume.style.ts';
import { ProgressionModal } from '../ProgressionModal/progression-modal.tsx';
import { BookData, BookStatus } from '../../types/bookData.ts';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { BookService } from '../../api/services/BookService.ts';
import { Alert, Snackbar } from '@mui/material';
import { StatusCode } from '../../api/client/IHttpClient.ts';
import { Link } from 'react-router-dom';
import { ReviewModal } from '../Review/review.tsx';

export const BookResume = (Bookzin: BookData) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reviewIsOpen, setReviewIsOpen] = useState(false);

  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();


  const handleProgressionModal = () => setIsOpen(!isOpen);
  const handleReviewModal = () => setReviewIsOpen(!reviewIsOpen);

  const handleDisable = async () => {
    const bookService = new BookService();
    const response = await bookService.disableBook(Bookzin.id ?? '');
    if (response.statusCode === StatusCode.Ok) {
      setSuccess(response?.resolve);
      setTimeout(() => setSuccess(undefined), 3000);

    } else {
      setError(response?.reject);
      setTimeout(() => setError(undefined), 3000);
    }
  }

  return (
    <StyledBookResumeContainer id="book-resume-container" >
      <StyledOptions>
        <ButtonWrapper>
          {(Bookzin.bookStatus === BookStatus.LIDO || Bookzin.bookStatus === BookStatus.ABANDONADO) ? (
            <Botao
              backgroundColor={Theme.colors.green}
              color={Theme.colors.white}
              fontSize={Theme.font.sizes.xsmall}
              padding={'.525rem 1rem'}
              borderRadius={Theme.borders.radius}
              onClick={handleReviewModal}
            >
              REVIEW
            </Botao>
          ) : (
            <Botao
              backgroundColor={Theme.colors.blue}
              color={Theme.colors.white}
              fontSize={Theme.font.sizes.xsmall}
              padding={'.525rem 1rem'}
              borderRadius={Theme.borders.radius}
              onClick={handleProgressionModal} >
              LER
            </Botao>
          )}
          <DeleteRoundedIcon onClick={handleDisable} />
        </ButtonWrapper>

        <ReviewModal
          isOpen={reviewIsOpen}
          handleModal={handleReviewModal}
          bookId={Bookzin.bookId}
          title={Bookzin.title}
          key={Bookzin.bookId} />

        <ProgressionModal
          id={Bookzin.bookId}
          isOpen={isOpen}
          handleModal={handleProgressionModal}
          title={Bookzin.title}
          key={Bookzin.googleId} />
      </StyledOptions>

      <ResumeTitle>
        {Bookzin.title}
      </ResumeTitle>

      <Link to={`/bookdetails/${Bookzin.googleId}`} style={{ textDecoration: 'none' }}>
        <StyledBookCover src={Bookzin.thumbnail || Bookzin.smallThumbnail} alt="Book Cover" />
      </Link>

      {success &&
        <Snackbar
          sx={{ marginRight: '4rem' }}
          open={!!success}
          autoHideDuration={5000}
          onClose={() => setSuccess(undefined)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert severity="success">
            {success}
          </Alert>
        </Snackbar>}

      {error &&
        <Snackbar
          sx={{ marginRight: '4rem' }}
          open={!!error}
          autoHideDuration={5000}
          onClose={() => setError(undefined)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert severity="error">
            {error}
          </Alert>
        </Snackbar>}
    </StyledBookResumeContainer>
  )
}
