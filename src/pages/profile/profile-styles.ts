import styled from "styled-components";
import { Theme } from "../../styles/theme";
import { BoxesWrappers } from "../reviews/reviews-box.styles";

const SettingsImageProfile = styled.img`
    width: 100px;
    border-radius: ${Theme.borders.radiusRound};
`
const UserInformation = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    background-color: ${Theme.colors.blue};
    color: ${Theme.colors.white};
    gap: ${Theme.margins.margin1rem};
    padding: ${Theme.margins.margin1rem};
    border-radius: ${Theme.borders.radius};
`

const TesteSettings = styled.div`
    background-color: red;
    width: 100px;
`

const PhotoWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    align-items: flex-start;
    gap: ${Theme.margins.margin1rem};
`

const UserContent = styled.div`
    display: flex;
    gap: 1rem;
    margin: ${Theme.margins.margin1rem} 0;
`

const BookNumber = styled.p`
    font-weight: ${Theme.font.weight.bold};
    font-size: ${Theme.font.sizes.regular};
    margin: auto 5px;
`

const UserInfo = styled.p`
    font-weight: ${Theme.font.weight.semiBold};
    color: ${Theme.colors.light};
    font-size: ${Theme.font.sizes.xsmall};
    text-decoration: underline;
`

const UserInfoWrapper = styled.div`
    display: inline-flex;
    gap: ${Theme.margins.marginhalfrem};
`

const ProfilerReviews = styled(BoxesWrappers)`
    height: min-content;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: ${Theme.margins.margin1rem};
    
    #box-wrapper {
        width: 400px;
        height: 220px;

    }

    #review-date {font-size: ${Theme.font.sizes.xsmall}}
    p {font-size: ${Theme.font.sizes.xsmall}}
    img {
        height: 150px;
        border-radius: ${Theme.borders.radius};
    }
    `

const ProfileBookInfo = styled.div`
    h2 {
        margin: ${Theme.margins.margin1rem} 0;
    }
`
const BooksInfStyles = {
    backgroundColor: Theme.colors.pink,
    color: Theme.colors.white,
    width: 'max-content',
    padding: '1rem',
    borderRadius: Theme.borders.radius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: Theme.colors.deepOrange
    }
}

const PhotoDiv = styled.div`
    display: flex;
    align-items: flex-start;
    gap: ${Theme.margins.margin1rem};
    flex-direction: column;
`

const EditPhotosDiv = styled.div`
    img{
        transition: all 0.3s;
        &:hover {
            transform: scale(1.1);
        }
        
    }
`

const AllUserInfos = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${Theme.margins.margin1rem};
`

const UserDescription = styled.div`
    display: flex;
    flex-direction: column;
`

const UserPhotoAndInfos = styled.div`
    display: inline-flex;
    gap: ${Theme.margins.margin1rem};
`

const BadgeInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 5px;
    border-radius: ${Theme.borders.radius};
    transition: all 1s;

    p{
        font-weight: ${Theme.font.weight.semiBold};
        color: ${Theme.colors.light};
        text-align: center;
    }

    &:hover {
        transform: scale(1.1);
        background-color: ${Theme.colors.deepBlue};
    }
    
`

const BadgeDescription = styled.span`
    text-align: center;
    font-size: ${Theme.font.sizes.xsmall};
`

const Badges = styled.div`
    display: inline-flex;
    gap: ${Theme.margins.marginhalfrem};

    img {
        height: 60px;
        border-radius: ${Theme.borders.radius};
    }
`

const AchievementsTitle = styled.p`
    font-weight: ${Theme.font.weight.bold};
    color: ${Theme.colors.light};    
    text-decoration: underline;
`

export { SettingsImageProfile, TesteSettings, UserInformation, PhotoWrapper, UserContent, BookNumber, ProfilerReviews, ProfileBookInfo, BooksInfStyles, PhotoDiv, EditPhotosDiv, UserInfo, UserInfoWrapper, AllUserInfos, UserPhotoAndInfos, UserDescription, BadgeInfo, AchievementsTitle, Badges, BadgeDescription }