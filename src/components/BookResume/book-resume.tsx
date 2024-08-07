import { useState } from 'react';
import { Theme } from '../../styles/theme.ts';
import { Botao } from '../globals/Button.style.tsx';
import { ButtonWrapper, ResumeTitle, StyledBookCover, StyledBookResumeContainer, StyledOptions } from './book-resume.style.ts';
import { ProgressionModal } from '../ProgressionModal/progression-modal.tsx';
import { BookData, BookStatus } from '../../types/bookData.ts';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Link } from 'react-router-dom';
import { ReviewModal } from '../Review/review.tsx';
import { DeleteDialog } from './delete-dialog.tsx';
import { Heart } from '../globals/Heart.style.tsx';
import { useFetchLastPage } from '../../api/hooks/useFetchLastPage.ts';
import { CircularProgress } from '@mui/material';

export const BookResume = (Bookzin: BookData) => {

  const [isOpen, setIsOpen] = useState(false);
  const [reviewIsOpen, setReviewIsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { actualPage, maxPage, loading } = useFetchLastPage(Bookzin.bookId);

  const handleProgressionModal = () => setIsOpen(!isOpen);
  const handleDeleteDialog = () => setConfirmOpen(!confirmOpen);
  const handleReviewModal = () => setReviewIsOpen(!reviewIsOpen);

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
        </ButtonWrapper>
        {loading ? <CircularProgress size={20} /> :
          <>
            <Heart bookId={Bookzin.bookId} />
            <DeleteRoundedIcon onClick={handleDeleteDialog} />
            <DeleteDialog open={confirmOpen} handleDeleteDialog={handleDeleteDialog} myBookId={Bookzin.id} />
          </>
        }
      </StyledOptions>


      <Link to={`/bookdetails/${Bookzin.googleId}`} style={{ textDecoration: 'none' }}>
        <StyledBookCover src={Bookzin.thumbnailUrl || Bookzin.smallThumbnailUrl} alt="Book Cover" />
      </Link>

      <ResumeTitle>
        <p>{Bookzin.title}</p> {!loading ? `[${actualPage}/${maxPage}]` : <CircularProgress size={20} />}
      </ResumeTitle>
      <ReviewModal
        isEditing={false}
        isOpen={reviewIsOpen}
        handleModal={handleReviewModal}
        bookId={Bookzin.bookId}
        title={Bookzin.title}
        key={Bookzin.bookId} />

      <ProgressionModal
        googleId={Bookzin.googleId}
        bookId={Bookzin.bookId}
        isOpen={isOpen}
        handleModal={handleProgressionModal}
        title={Bookzin.title}
        key={Bookzin.googleId} />

    </StyledBookResumeContainer>
  )
}
