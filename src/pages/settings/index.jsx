import { Component, useCallback, useEffect, useState } from "react";
import { Layout } from "../layout/index.jsx";
import { SettingsImageProfile, UserInformation } from "./index.style.ts";
import { Botao } from "../../components/globals/Button.style.tsx";
import { Theme } from "../../styles/theme.ts";
import { EditUser } from "./EditUser.jsx";
import { fetchUserData } from "../../hooks/useUserData.ts";

export const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('@Auth:token');

  const getUserData = useCallback(async (token) => {
    const response = await fetchUserData(token);
    setUserData(response);
    console.log(userData);

  });

  useEffect(() => {
    if (token) {
      getUserData(token);
    }
  }, [token])

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
      {userData ? (
        <>
          <UserInformation>
            <SettingsImageProfile src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="Foto do usuário" />
            <div>
              <h2>Configurações de conta</h2>
              <p>Nome: <span>{userData.name}</span> </p>
              <p>Nome de usuário: <span>{userData.usernome}</span> </p>
              <p>Email: <span>{userData.email}</span> </p>
            </div>
          </UserInformation>

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
        </>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}

    </Layout>
  )
}
