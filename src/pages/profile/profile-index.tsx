import { Layout } from "../layout/layout.js";
import { Theme } from "../../styles/theme.ts";
import { useFetchUserData } from "../../api/hooks/useFetchUserData.ts";
// import { EditProfile } from "./edit-profile.tsx";
import { BookNumber, PhotoWrapper, ProfileBookInfo, ProfilerReviews, SettingsImageProfile, UserContent, UserInformation } from "./profile-styles.ts";
import { Box } from "@mui/material";
import { ProfileSkeletons } from "./profile-skeletons.tsx";
import { useFetchPaginometer } from "../../api/hooks/useFetchPaginometer.ts";
import { useFetchReviewsByUser } from "../../api/hooks/useFetchReviewsByUser.ts";
import { ReviewsCard } from "../reviews/reviews-card.tsx";
import { useFetchAllProgressions } from "../../api/hooks/useFetchProgressions.ts";
import { ProgressionsCard } from "../progressions/progressions-card.tsx";

export const Profile = () => {
  // const [isEditing, setIsEditing] = useState<boolean>(false);
  const { reviews } = useFetchReviewsByUser();
  const { progressions } = useFetchAllProgressions();
  const { user } = useFetchUserData();
  const { quantity } = useFetchPaginometer();
  // to - do editar perfil

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

  return (
    <Layout>
      {user ?
        <>
          <h2>Meu perfil</h2>
          <UserContent>
            <UserInformation>
              <PhotoWrapper>
                <SettingsImageProfile src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="Foto do usuário" />
                <div>
                  <BookNumber>{user.name}</BookNumber>
                  <p>{user.nickname}</p>
                </div>
              </PhotoWrapper>

              <div>
                <p><u>Redes sociais:</u></p>
                <p>Email: <span>{user.email}</span> </p>
              </div>
            </UserInformation>

            <Box sx={{ display: 'flex', flex: '1', flexWrap: 'wrap', gap: '1rem', fontWeight: Theme.font.weight.semiBold }}>
              <Box sx={BooksInfStyles}> Quero ler <BookNumber> {quantity?.queroLer} </BookNumber></Box>
              <Box sx={BooksInfStyles}>Lendo <BookNumber>{quantity?.lendo}</BookNumber></Box>
              <Box sx={BooksInfStyles}>Abandonados <BookNumber>{quantity?.abandonado}</BookNumber></Box>
              <Box sx={BooksInfStyles}>Favoritos <BookNumber>{quantity?.favorite}</BookNumber></Box>
              <Box sx={BooksInfStyles}>Lidos <BookNumber>{quantity?.lido}</BookNumber></Box>
              <Box sx={BooksInfStyles}>Resenhas <BookNumber>{quantity?.review}</BookNumber></Box>
              <Box sx={BooksInfStyles}>Paginômetro <BookNumber>{quantity?.paginometer}</BookNumber></Box>
            </Box>
          </UserContent>

          <ProfileBookInfo>
            <div>
              <h2>Últimas avaliações</h2>
              <ProfilerReviews id="profile-reviews">
                <ReviewsCard isEditable={false} review={reviews?.slice(0, 10) ?? []} />
              </ProfilerReviews>
            </div>

            <div>
              <h2>Últimas progressões</h2>
              <ProgressionsCard progressions={progressions?.slice(0, 10) ?? []} />
            </div>
          </ProfileBookInfo>
        </>
        :
        <ProfileSkeletons />}

    </Layout >
  )
}
