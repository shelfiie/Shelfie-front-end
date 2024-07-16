import { useState } from 'react';
import { Theme } from '../../styles/theme.ts';
import { Botao } from '../globals/Button.style.tsx';

// import Lixeira from '../../assets/icons/lixeira.png';

import { StyledBookCover, StyledBookResumeContainer, StyledOptions } from './book-resume.style.ts';
import { ProgressionModal } from '../ProgressionModal/progression-modal.tsx';



export const BookResume = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => setIsOpen(!isOpen);

  return (
    <StyledBookResumeContainer>
      <StyledOptions>
        {/* to do - lixeira? */}
        {/* <StyledLixeira src={Lixeira} alt="" /> */}

        <Botao 
          backgroundColor={Theme.colors.blue}
          color={Theme.colors.white}
          fontSize={Theme.font.sizes.xsmall}
          padding={'.525rem 1rem'}
          borderRadius={Theme.borders.radius}
          onClick={handleModal} >
          LER
        </Botao>

        <ProgressionModal isOpen={isOpen} handleModal={handleModal}/>

      </StyledOptions>

      <StyledBookCover src='https://centrodametropole.fflch.usp.br/sites/centrodametropole.fflch.usp.br/files/user_files/livros/imagem/capa-no-book-cover.png' alt="Book Cover" />

    </StyledBookResumeContainer>
  )
}
