import { Layout } from "../layout/layout.js";
import { Theme } from "../../styles/theme.ts";
import { BookNumber, BooksInfStyles, PhotoWrapper, ProfileBookInfo, ProfilerReviews, SettingsImageProfile, UserContent, UserInformation } from "./profile-styles.ts";
import { Box } from "@mui/material";
import { ProfileSkeletons } from "./profile-skeletons.tsx";
import { useFetchPaginometer } from "../../api/hooks/useFetchPaginometer.ts";
import { useFetchReviewsByUser } from "../../api/hooks/useFetchReviewsByUser.ts";
import { ReviewsCard } from "../reviews/reviews-card.tsx";
import { useFetchAllProgressions } from "../../api/hooks/useFetchProgressions.ts";
import { ProgressionsCard } from "../progressions/progressions-card.tsx";
import { ReviewProfileSkeletons } from "./review-profile-skeletons.tsx";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useContext, useState } from "react";
import { AuthContext } from "../../api/context/auth.tsx";
import { EditUserModal } from "./edit-user-modal.tsx";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { DeleteDialog } from "./delete-dialog.tsx";

export const Profile = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const { reviews, loading } = useFetchReviewsByUser();
  const { progressions } = useFetchAllProgressions();
  const { user, refetchUser } = useContext(AuthContext);
  const { quantity } = useFetchPaginometer();

  const handleOpenEditModal = () => setIsEditing(!isEditing);
  const handleConfirmDelete = () => setConfirmDelete(!confirmDelete);

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
                  <BookNumber>Nome: {user.name}</BookNumber>
                  <p>Nickname: {user.nickname}</p>
                  <p>Email: <span>{user.email}</span> </p>
                </div>
                <a onClick={handleOpenEditModal}>
                  <EditRoundedIcon />
                </a>
                <a onClick={handleConfirmDelete}>
                  <DeleteRoundedIcon />
                </a>
                <DeleteDialog
                  id={user.id}
                  open={confirmDelete}
                  handleDeleteDialog={handleConfirmDelete} />
                <EditUserModal
                  refetchUser={refetchUser}
                  id={user.id}
                  name={user.name}
                  nickname={user.nickname}
                  isOpen={isEditing}
                  handleModal={handleOpenEditModal} />

              </PhotoWrapper>
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
              {loading ? <ReviewProfileSkeletons /> :
                <ProfilerReviews id="profile-reviews">
                  <ReviewsCard isEditable={false} review={reviews?.slice(0, 10) ?? []} />
                </ProfilerReviews>
              }
            </div>

            <div>
              <h2>Últimas progressões</h2>
              {loading ? <ReviewProfileSkeletons /> :
                <ProgressionsCard progressions={progressions?.slice(0, 10) ?? []} />
              }
            </div>
          </ProfileBookInfo>
        </>
        :
        <ProfileSkeletons />}

    </Layout >
  )
}
