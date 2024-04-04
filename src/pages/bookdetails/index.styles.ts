import styled from "styled-components";
import { BoxShadow } from "../../components/globals/Box.style";
import { Theme } from "../../styles/theme";
import { PageContent } from "../layout/index.styles";


const BoxBook = styled(BoxShadow)`
    *{font-family: ${Theme.font.family.poppins};}
    h1{
       font-size: max(1rem, 2.5vw);
       letter-spacing: 1px;
    }
    margin: ${Theme.margins.margin1rem};
    display: grid;
    grid-template-columns: 1fr 5fr;

    img{
        width: max(5rem, 80%);
        border-radius: ${Theme.borders.radiusRound};
        border: ${Theme.borders.border3px} solid black;
    }
`

const BoxBookImage = styled(BoxShadow)`
    width: 12rem;
    height: min-content;
    img{
        width: 100%;
        border-radius: ${Theme.borders.radiusRound};
    }
`

const BookContent = styled(PageContent)`
    display: grid;
    margin: 0 0 0 1rem;
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
    padding: .3rem;

    font-weight: ${Theme.font.weight.bold};
`

const UserBookDetails = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;

    gap: ${Theme.margins.margin1rem};
    width: 100%;
`

export { BookContent, BookDescription, BoxBook, BoxBookImage, ComplementaryDetails, PageCount, UserBookDetails };

