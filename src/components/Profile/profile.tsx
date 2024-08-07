import { useContext } from 'react';
import { ProfileContainer } from './profile.styles.ts'
import { AuthContext } from '../../api/context/auth.tsx';
// to do: pegar as infos do usuario
export const Perfil = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <ProfileContainer>
      <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="Foto de perfil" />

      <div>
        <h3>{user?.name}</h3>
      </div>

    </ProfileContainer>
  )
}
