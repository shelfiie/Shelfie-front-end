import { z } from "zod"
import { UserData } from "../../types/userType";
import { Alert, Box, Modal, TextField } from "@mui/material";
import { ButtonsDiv, ProgressionForm, styledBox } from "../../components/ProgressionModal/progression-modal.styles";
import { Botao } from "../../components/globals/Button.style";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Theme } from "../../styles/theme";
import { useState } from "react";
import { UserService } from "../../api/services/UserService";
import { HttpResponse, StatusCode } from "../../api/client/IHttpClient";

const editUserFilter = z.object({
    id: z.string(),
    name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }).max(50, { message: 'Nome deve ter no máximo 50 caracteres' }),
    nickname: z.string().min(3, { message: 'Nickname deve ter no mínimo 3 caracteres' }).max(50, { message: 'Nickname deve ter no máximo 50 caracteres' }),
});

type EditUserFilter = z.infer<typeof editUserFilter>;

type EditModalProps = {
    name: UserData['name'];
    nickname: UserData['nickname'];
    id: UserData['id'];
    isOpen: boolean;
    handleModal: () => void;
    refetchUser?: () => Promise<HttpResponse<unknown>>;
}


const EditUserModal = ({ id, name, nickname, handleModal, isOpen, refetchUser }: EditModalProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | null>();
    const [error, setError] = useState<string | null>();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<EditUserFilter>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(editUserFilter)
    });

    const onSubmit: SubmitHandler<EditUserFilter> = async (data: EditUserFilter) => {
        const service = new UserService();
        const response = await service.editUser(data as UserData);
        if (response.statusCode === StatusCode.Ok) {
            setLoading(false);
            setError(null);
            setSuccess('Usuário editado com sucesso');
            setTimeout(() => {
                setSuccess(null);
                handleModal();
            }, 3000);
            refetchUser && refetchUser();
        } else {
            setLoading(false);
            setError('Erro ao editar usuário');
            setTimeout(() => setError(null), 3000);
        }
    }

    return (
        <Modal open={isOpen} onClose={handleModal}>
            <Box width={500} height={'max-content'} sx={styledBox}>
                <ProgressionForm onSubmit={handleSubmit(onSubmit)}>
                    <h2>Editar Usuário</h2>
                    <p>Você pode alterar algumas informações do seu usuário.</p>

                    <TextField
                        sx={{ display: 'none' }}
                        {...register('id')}
                        value={id} />
                        
                    <p>Nome:</p>
                    <TextField
                        {...register('name')}
                        type="text"
                        placeholder="Nome"
                        defaultValue={name} />
                    {errors.name && <p>{errors.name.message}</p>}

                    <p>Nickname:</p>
                    <TextField
                        {...register('nickname')}
                        type="text"
                        placeholder="Nickname"
                        defaultValue={nickname} />
                    {errors.name && <p>{errors.name.message}</p>}

                    <ButtonsDiv>
                        <Botao
                            type="button"
                            onClick={handleModal}
                            borderRadius={Theme.borders.radius}
                            color={Theme.colors.white}
                            fontSize={Theme.font.sizes.xsmall}>Cancelar</Botao>

                        <Botao
                            type="submit"
                            backgroundColor={Theme.colors.green}
                            borderRadius={Theme.borders.radius}
                            color={Theme.colors.white}
                            fontSize={Theme.font.sizes.xsmall}>{
                                loading ? 'Carregando' : 'Salvar'} </Botao>
                    </ButtonsDiv>

                </ProgressionForm>
                {success && <Alert sx={{marginTop: '1rem'}} severity="success">{success}</Alert>}
                {error && <Alert sx={{marginTop: '1rem'}} severity="error">{error}</Alert>}
            </Box>
        </Modal>
    )
}

export { EditUserModal }