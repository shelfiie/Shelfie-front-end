import styled from "styled-components";
import { Theme } from "../../styles/theme";

const BoxWrapper = styled.div`
    background-color: white;
    margin-top: ${Theme.margins.margin1rem};
    border-radius: ${Theme.borders.radius};
    border: ${Theme.borders.border2px} solid ${Theme.colors.deep};
    padding: ${Theme.margins.margin1rem};

    display: inline-flex;
    width: 100%;

    img{
        margin-right: ${Theme.margins.margin1rem};
    }
`

const TitleRating = styled.div`
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    span {
        scale: 0.9;
    }
    p {
        font-size: ${Theme.font.sizes.small};
        font-family: ${Theme.font.family.poppins};
        font-weight: 500;
    }
`

const ReviewDate = styled.p`
    font-size: ${Theme.font.sizes.xsmall};
    color: ${Theme.colors.lightDark};
    font-family: ${Theme.font.family.poppins};
    text-align: end;
    `

const ReviewsContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const ReviewDetails = styled.div`
    flex: 4;
    display: grid;
`

const Icons = styled.div`
    display: inline-flex;
`

const BoxesWrappers = styled.div`
    height: 100%;
`

const Like = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;

    span {
        font-size: ${Theme.font.sizes.xxsmall};
        font-family: ${Theme.font.family.poppins};
    }
    img {
        height: 20px !important;
        margin: 0;
    }
`

const LikeDetails = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 3px;
`



export { TitleRating, ReviewDate, BoxWrapper, ReviewsContent, ReviewDetails, Icons, BoxesWrappers, Like, LikeDetails }