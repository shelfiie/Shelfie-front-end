import { useCallback, useEffect, useState } from "react";
import { Layout } from "../layout/index.jsx";
import { SettingsImageProfile } from "./index.style.ts";
import { Botao } from "../../components/globals/Button.style.tsx";
import { Theme } from "../../styles/theme.ts";
import { EditUser } from "./EditUser.jsx";
import { fetchUserData } from "../../api/useUserData.ts";

export const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = useCallback(async () => {
    const response = await fetchUserData();
    setUserData(response);
    console.log(userData);

  });

  useEffect(() => {
    getUserData();
  }, []);

  const handleEditComplete = useCallback(() => {
    setIsEditing(false);
  })

  if (isEditing) {
    return (
      <EditUser onEditComplete={handleEditComplete} />
    )
  }

  return (
    <Layout>
      <SettingsImageProfile src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="Foto do usuário" />
      <h2>Configurações de conta</h2>
      <p>Nome: <span>{userData.name}</span> </p>
      <p>Nome de usuário: <span>{userData.usernome}</span> </p>
      <p>Email: <span>{userData.email}</span> </p>

      <Botao
        content="Editar"
        width='min-content'
        padding='0.5rem 1.5rem'
        backgroundcolor={Theme.colors.blue}
        color={Theme.colors.white}
        fontSize={Theme.font.sizes.xsmall}
        onClick={() => setIsEditing(!isEditing)} />

      <Botao
        content="Desativar conta"
        width='max-content'
        padding='0.5rem 1.5rem'
        backgroundcolor={Theme.colors.blue}
        color={Theme.colors.white}
        fontSize={Theme.font.sizes.xsmall} />

    </Layout>
  )
}
