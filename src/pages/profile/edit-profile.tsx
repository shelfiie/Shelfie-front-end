import { Layout } from '../layout/index.tsx'
import { SettingsImageProfile } from "./profile-styles.ts";
import { Botao } from "../../components/globals/Button.style.tsx";
import { Theme } from "../../styles/theme.ts";
import { SubmitHandler, useForm } from 'react-hook-form';
import { userRegisterFilter, UserRegisterFilter } from '../../types/authType.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/globals/input.style.ts';

export const EditProfile = ({ setIsEditing }: { setIsEditing: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<UserRegisterFilter>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(userRegisterFilter)
    });

    const onSubmit: SubmitHandler<UserRegisterFilter> = async (data: UserRegisterFilter) => {

        // data = {
        //     // image: watch('image'),
        //     name: watch('name'),
        //     usernome: watch('usernome'),
        //     email: watch('email'),
        //     password: watch('password')
        // }

        // console.log(data);


        // setIsEditing(false);
    }

    return (
        <Layout>
            <SettingsImageProfile src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="Foto do usuário" />
            <form>
                {/* <Input /> */}

                <label htmlFor="name">Nome</label>
                <Input
                    id="input-nome"
                    type='text'
                    placeholder='Coloque seu nome aqui'
                    {...register('name')} />
                {errors.name && <p>{errors.name.message}</p>}

                <label htmlFor="usernome">Nome de usuário</label>
                <Input
                    id="usernome"
                    type='text'
                    placeholder='Insira seu novo nome de usuário'
                    {...register('usernome')} />
                {errors.usernome && <p>{errors.usernome.message}</p>}

                <label htmlFor="email">Email</label>
                <Input
                    id="email"
                    type='email'
                    placeholder='Insira seu novo email'
                    {...register('email')} />
                {errors.email && <p>{errors.email.message}</p>}

                <label htmlFor="password">Senha</label>
                <Input
                    id="password"
                    type='password'
                    placeholder='Digite sua nova senha'
                    {...register('password')} />
                {errors.password && <p>{errors.password.message}</p>}

                <Input
                    id="confirm-password"
                    type='password'
                    placeholder='Confirme sua senha'
                    {...register('confirmPassword')} />
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

            </form>
            <Botao
                onClick={handleSubmit(onSubmit)}
                width='min-content'
                padding='0.5rem 1.5rem'
                backgroundColor={Theme.colors.blue}
                color={Theme.colors.white}
                fontSize={Theme.font.sizes.xsmall}
            >
                Salvar
            </Botao>
        </Layout>
    )
}
