import Coracao from '../../assets/icons/coracao.png';
import CoracaoPreenchido from '../../assets/icons/coracao-preenchido.png';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

export const HeartStyle = styled.img`
  width: 20px;
  height: 20px;
  transition: 0.3s ease-in-out;
`;
// to do - favoritar o livro e coloca na lista de favoritos
export const Heart = (props : JSX.Element) => {
    const [isClicked, setIsClicked] = useState(false);
    var [ src, setSrc ] = useState(Coracao);

    const handleClick = () => {
        setIsClicked(!isClicked);
      }

    useEffect(() => {
      if(isClicked){
        setSrc(CoracaoPreenchido);
      } else {
        setSrc(Coracao);
      }
    }, [isClicked]);

  return(
    <HeartStyle 
      onClick={handleClick}
      src={src}
      {...props}
    />
  )
}