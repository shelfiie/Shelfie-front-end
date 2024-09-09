import { Alert, Box, Modal } from "@mui/material"
import { ButtonsDiv, ProgressionForm, styledBox } from "../../components/ProgressionModal/progression-modal.styles";
import { Botao } from "../../components/globals/Button.style";
import { Theme } from "../../styles/theme";
import { profileImageLinks } from "../../types/userType";
import { EditPhotosDiv } from "./profile-styles";
import { useState } from "react";
import { UserService } from "../../api/services/UserService";
import { HttpResponse } from "../../api/client/IHttpClient";

type EditPhotoModalProps = {
    open: boolean;
    handleEditPhoto: () => void;
    refetchUser?: () => Promise<HttpResponse<unknown>> | null;
}


export const EditPhotoModal = ({ open, handleEditPhoto, refetchUser }: EditPhotoModalProps) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [linkSelected, setLinkSelected] = useState<string>();
    const [success, setSuccess] = useState<string | null>();
    const [error, setError] = useState<string | null>();

    const handleSelect = (index: number, link: string) => {
        setSelected(index);
        setLinkSelected(link);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const service = new UserService();
        const response = await service.editProfileImage(linkSelected);
        if (response.statusCode === 200) {
            setSuccess(response?.resolve);
            refetchUser && refetchUser();
            
            setTimeout(() => {
                setSuccess(null);
                handleEditPhoto();
            }, 2000);
        } else {
            setError(response.reject);
            setTimeout(() => {
                setError(null);
                setError(response.reject);
            }, 2000);
        }
    }

    return (
        <Modal open={open} onClose={handleEditPhoto}>
            <Box width={700} height={'max-content'} sx={styledBox}>
                <ProgressionForm onSubmit={handleSubmit}>
                    <h2>Alterar imagem de perfil</h2>
                    <p>Você pode alterar sua imagem de perfil.</p>

                    <EditPhotosDiv>
                        {profileImageLinks.map((link, index) => (
                            <img
                                onClick={() => handleSelect(index, link)}
                                key={index}
                                src={link}
                                alt={`Foto ${index}`}
                                style={{
                                    width: '100px', margin: '0.5rem', cursor: 'pointer', border: selected === index ? `3px solid ${Theme.colors.blue}` : 'none', borderRadius: "100%"
                                }}
                            />
                        ))}
                    </EditPhotosDiv>

                    {success && <Alert sx={{ marginTop: '1rem' }} severity="success">{success}</Alert>}
                    {error && <Alert sx={{ marginTop: '1rem' }} severity="error">{error}</Alert>}

                    <ButtonsDiv>
                        <Botao
                            type="button"
                            onClick={handleEditPhoto}
                            borderRadius={Theme.borders.radius}
                            color={Theme.colors.white}
                            fontSize={Theme.font.sizes.xsmall}>Cancelar</Botao>

                        <Botao
                            type="submit"
                            backgroundColor={Theme.colors.green}
                            borderRadius={Theme.borders.radius}
                            color={Theme.colors.white}
                            fontSize={Theme.font.sizes.xsmall}>{'Salvar'} </Botao>
                    </ButtonsDiv>

                </ProgressionForm>
            </Box>
        </Modal>
    )
}