import styled from "styled-components";
import { Theme } from "../../styles/theme";
import { PageCount } from "../bookdetails/book-details-styles";

const StatusTag = styled.div`
    background-color: ${Theme.colors.orange};
    color: ${Theme.colors.white};
    border: ${Theme.borders.border2px} solid ${Theme.colors.deep};
    border-radius: ${Theme.borders.radius};
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 ${Theme.margins.margin1rem};
`
const BookProgression = styled.div`
    display: flex;
    align-items: center;
    gap: ${Theme.margins.margin1rem};

`

const BookInfo = styled.div`
    width: 330px;
    display: inline-flex;
    gap: ${Theme.margins.margin1rem};
    text-align: justify;
    color: ${Theme.colors.lightGrey};

    p{
        font-family: ${Theme.font.family.poppins};
        font-size: ${Theme.font.sizes.xsmall};
        font-weight: ${Theme.font.weight.light};
        color: ${Theme.colors.lightGrey}
    }
    span{ 
        text-decoration:underline;
        font-weight: ${Theme.font.weight.semiBold};
      }
    img {
        height: 150px;
    }
`

const Commentary = styled.div`
    font-family: ${Theme.font.family.poppins};
    font-weight: ${Theme.font.weight.semiBold};
    text-align: start;
    padding-bottom: ${Theme.margins.marginhalfrem};
    border-bottom: 2px dotted ${Theme.colors.white};
`

const PercentageStyle = {
    fontFamily: Theme.font.family.syne,
    fontSize: Theme.font.sizes.xsmall,
}

const ProgressionPageCount = styled(PageCount)`
    padding: .1rem .5rem;
    font-family: ${Theme.font.family.poppins};
    border: ${Theme.borders.border2px} solid ${Theme.colors.white};
`

const CompleteProgress = {
    width: '30%',
    height: 20,
    borderRadius: 2,
    backgroundColor: 'transparent',
    border: `${Theme.borders.border2px} solid ${Theme.colors.deep}`,
    '& .css-5xe99f-MuiLinearProgress-bar1': {
        backgroundColor: Theme.colors.pink,
        borderRight: `${Theme.borders.border2px} solid ${Theme.colors.deep}`,
    },
}

const AllProgressions = styled.div`
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1rem;
`

const ProgressionsStyles = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
`

export { StatusTag, BookProgression, CompleteProgress, PercentageStyle, BookInfo, Commentary, ProgressionPageCount, AllProgressions, ProgressionsStyles }