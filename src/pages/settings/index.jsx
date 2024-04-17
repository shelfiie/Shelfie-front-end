import { useState } from "react";
import { Layout } from "../layout/index.jsx";
// import { Entrar, Form, LoginDiv } from "../login/index.styles.ts";
// import { Input } from "../../components/globals/input.style.ts";
import { SettingsImageProfile } from "./index.style.ts";

export const Settings = () => {
  const [ isEditing, setIsEditing ] = useState(false);
  const handleUserSettings = () => {
    // to do - implementar a função de alterar os dados do usuário
    setIsEditing(!isEditing);
    if (isEditing === true) {
      
    }
  }

  return (
    <Layout>
      <SettingsImageProfile src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="Foto do usuário" />
      <p>Nome</p>
      <p>username</p>
      <p></p>

        {/* <Form action="">
            <Input type="text" placeholder='teste'></Input>
        </Form> */}
    </Layout>
  )
}
