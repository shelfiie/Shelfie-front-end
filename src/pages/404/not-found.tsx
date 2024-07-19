import { Link } from 'react-router-dom'
import { NotFoundGlobals, NotFoundWrapper, NotfoundText } from './not-found.styles.ts'
import { Waves } from '../../assets/Waves.tsx';

export const NotFound = () => {
    return (
        <NotFoundWrapper>
            <NotFoundGlobals />

            <NotfoundText>
                <h1>Oops!</h1>
                <p>Nós não conseguimos achar a página que você tentou acessar.</p>
            </NotfoundText>
            <Link to="/">
                Voltar à página inicial
            </Link>

            <Waves />
        </NotFoundWrapper>
    )
}
