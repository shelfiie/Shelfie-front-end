import styled from "styled-components";
import { BoxShadow } from "../../components/globals/Box.style";
import { Theme } from "../../styles/theme";
import { PageContent } from "../layout/layout.styles";


const BoxBook = styled(BoxShadow)`
    *{font-family: ${Theme.font.family.poppins};}
    h1{
       font-size: max(1rem, 1.5vw);
       letter-spacing: 1px;
    }
    margin: ${Theme.margins.margin1rem};
    display: grid;
    grid-template-columns: 1fr 5fr;

`

const BookCoverImage = styled.img`
    width: max(5rem, 80%);
    border-radius: ${Theme.borders.radiusRound};
    border: ${Theme.borders.border3px} solid black;
`

const BoxBookImage = styled(BoxShadow)`
    width: 10rem;
    height: min-content;
`

const BookContent = styled(PageContent)`
    display: grid;
    margin: 0;
    text-align: left;
    height: 100%;
    padding: ${Theme.margins.margin1rem};
    gap: ${Theme.margins.marginhalfrem};
`

const ComplementaryDetails = styled.div`
    color: ${Theme.colors.lightDark};
    font-size: min(${Theme.font.sizes.xxsmall}, 1.5vw);

    display: inline-flex;
    gap: ${Theme.margins.margin2rem};
`

const BookDescription = styled.div`
    span{
        font-weight: ${Theme.font.weight.bold};
        font-size: ${Theme.font.sizes.xxsmall};
        color: ${Theme.colors.dark};

        text-decoration: underline;
    }

    p{
        color: ${Theme.colors.dark};
        text-align: justify;
        font-size: min(${Theme.font.sizes.xsmall}, 2vw);
    }
`

const PageCount = styled.p`
    border-radius: ${Theme.borders.radius};
    border: ${Theme.borders.border3px} solid ${Theme.colors.deep};
    padding: .5rem 1rem;

    font-size: ${Theme.font.sizes.xsmall};
    font-weight: ${Theme.font.weight.bold};
`

const UserBookDetails = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;

    margin-top: ${Theme.margins.margin1rem};

    gap: ${Theme.margins.margin1rem};
    width: 100%;

    > div{
        display: inline-flex;
        gap: ${Theme.margins.margin1rem};
        align-items: center;
    }
`

const Carregando = styled.div`
    display: grid;
    margin: 0 auto;
`
const TitleWrapper = styled.div`
    display: flex;
    gap: ${Theme.margins.margin1rem};
`

export { BookContent, BookDescription, BoxBook, BoxBookImage, ComplementaryDetails, PageCount, UserBookDetails, Carregando, BookCoverImage, TitleWrapper };;

