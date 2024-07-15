import { bookOptions } from '../../api/hooks/useBookStatus.ts';
import { Theme } from '../../styles/theme';
import { DropDownSelection} from '../DropDownSelection/index';
// import Lixeira from '../../assets/icons/lixeira.png';
import { StyledBookCover, StyledBookResumeContainer, StyledOptions } from './index.style.ts';


export const BookResume = ( ) => {
  return (
    <StyledBookResumeContainer>
        <StyledOptions>
            {/* to do - lixeira? */}
            {/* <StyledLixeira src={Lixeira} alt="" /> */}

            <DropDownSelection 
            options={bookOptions}
            content='SELECIONAR'
            backgroundcolor={Theme.colors.blue}
            color={Theme.colors.white}
            fontSize={Theme.font.sizes.xxsmall}
            padding={Theme.margins.margin5px} />

        </StyledOptions>

        <StyledBookCover src='https://centrodametropole.fflch.usp.br/sites/centrodametropole.fflch.usp.br/files/user_files/livros/imagem/capa-no-book-cover.png' alt="Book Cover" />
        
    </StyledBookResumeContainer>
  )
}

// const BookInList = () => {
//     return (
//         <div>
//             oi
//         </div>
//     );
// } 
