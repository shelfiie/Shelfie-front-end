import { React, useState } from 'react'
import { Layout } from '../layout'
import { SettingsImageProfile } from "./index.style.ts";
import { Botao } from "../../components/globals/Button.style.tsx";
import { Theme } from "../../styles/theme.ts";

export const EditUser = ({ onEditComplete }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userNome, setUserNome] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');

    // const { user } = useState({
    //     name,
    //     userNome,
    //     email,
    //     password,
    //     image
    // });

    const handleChange = (e) => {
        const { target, value } = e.target;

        if (target.name === 'name') setName(value);
        if (target.name === 'email') setEmail(value);
        if (target.name === 'user') setUserNome(value);
        if (target.name === 'password') setPassword(value);
        if (target.name === 'image') setImage(value);
    }

    async function handleEditUserInformation(e) {
        // const response = await updateUser(user);
        onEditComplete();
    }

    return (
        <Layout>
            <SettingsImageProfile src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="Foto do usuário" />
            <form>
                <input type="file" id="image" name="image" placeholder="Foto de perfil" value={image} onChange={handleChange} />

                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" name="name" placeholder="Nome" value={name} onChange={handleChange} />

                <label htmlFor="usernome">Nome de usuário</label>
                <input type="text" id="usernome" name="usernome" placeholder="Nome de usuário" value={userNome} onChange={handleChange} />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={handleChange} />

                <label htmlFor="password">Senha</label>
                <input type="password" id="password" name="password" placeholder="Senha" value={password} onChange={handleChange} />
                <input type="password" id="confirmPassword" name="password" placeholder="Confirmar senha" value={password} onChange={handleChange} />
            </form>
            <Botao
                onClick={handleEditUserInformation}
                content="Salvar"
                width='min-content'
                padding='0.5rem 1.5rem'
                backgroundcolor={Theme.colors.blue}
                color={Theme.colors.white}
                fontSize={Theme.font.sizes.xsmall}
            />
        </Layout>
    )
}
