import styled from "styled-components";
import { Theme } from "../../styles/theme";

const CarrouselTitle = styled.h2`
    margin-bottom: ${Theme.margins.margin1rem};
`

const Carrousel = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
`

const BooksWrapper = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
`

const TabListStyle = {
    borderRadius: Theme.borders.radiusRound,
    border: '3px solid black',

    '& .MuiTabs-indicator': {
        backgroundColor: Theme.colors.green,
    },
    '& .MuiTabs-indicatorSpan': {
        width: '100%',
        backgroundColor: '#000',
    },
}

const TabStyle = {
    borderRadius: Theme.borders.radiusRound,
    marginRight: Theme.margins.margin5px,
    fontFamily: Theme.font.family.syne,
    
    // texto do selecionado
    '&.Mui-selected': {
        color: Theme.colors.deep,
    },
}

export { Carrousel, CarrouselTitle, BooksWrapper, TabListStyle, TabStyle }