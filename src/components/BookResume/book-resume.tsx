import { useState } from 'react';
import { Theme } from '../../styles/theme.ts';
import { Botao } from '../globals/Button.style.tsx';
// import Lixeira from '../../assets/icons/lixeira.png';
import { ButtonWrapper, ResumeTitle, StyledBookCover, StyledBookResumeContainer, StyledOptions } from './book-resume.style.ts';
import { ProgressionModal } from '../ProgressionModal/progression-modal.tsx';
import { BookData, BookStatus } from '../../types/bookData.ts';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { BookService } from '../../api/services/BookService.ts';
import { Alert, Snackbar } from '@mui/material';

type BookResumeProps = {
  // bookId
  id: BookData['id'];
  status: BookData['bookStatus'];
  myBookId: string | undefined;
}

export const BookResume = ({ id, myBookId, status }: BookResumeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState<string | undefined>();

  const handleProgressionModal = () => setIsOpen(!isOpen);

  const handleDisable = async () => {
    const bookService = new BookService();
    // recebe a my book id ainda
    const response = await bookService.disableBook(myBookId ?? '');
    setSuccess(response?.resolve);
    console.log(response);
  }

  return (
    <StyledBookResumeContainer id="book-resume-container" >
      <StyledOptions>
        <ButtonWrapper>
          {(status === BookStatus.LIDO || status === BookStatus.ABANDONADO) ? (
            <Botao
              backgroundColor={Theme.colors.green}
              color={Theme.colors.white}
              fontSize={Theme.font.sizes.xsmall}
              padding={'.525rem 1rem'}
              borderRadius={Theme.borders.radius}
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

        <ProgressionModal isOpen={isOpen} handleModal={handleProgressionModal} />
      </StyledOptions>

      <ResumeTitle>
        {id}
      </ResumeTitle>

      <StyledBookCover src='https://centrodametropole.fflch.usp.br/sites/centrodametropole.fflch.usp.br/files/user_files/livros/imagem/capa-no-book-cover.png' alt="Book Cover" />

      {success &&
        <Snackbar
          sx={{ marginRight: '4rem' }}
          open={!!success}
          autoHideDuration={5000}
          onClose={() => setSuccess(undefined)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={() => setSuccess(undefined)} severity="success">
            {success}
          </Alert>
        </Snackbar>}
    </StyledBookResumeContainer>
  )
}
