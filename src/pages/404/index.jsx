import React from 'react'
import { Link } from 'react-router-dom'
import { NotFoundGlobals, NotFoundWrapper, NotfoundText } from './index.styles.ts'
import { Waves } from '../../assets/Waves.tsx'

export const NotFound = () => {
    return (
        <NotFoundWrapper>
            <NotFoundGlobals />
            <dotlottie-player
                src="https://lottie.host/c56a1baa-441c-4d7e-aa4a-943391d8b6b8/okfyWWwQa2.json"
                background="transparent"
                speed="1"
                style={{ margin: '0 auto', width: '500px', height: '500px' }}
                loop
                autoplay>
            </dotlottie-player>

            <NotfoundText>
                <h1>Oops!</h1>
                <p>Nós não conseguimos achar a página que você tentou acessar.</p>
            </NotfoundText>
            <Link to="Shelfie-front-end/home">
                Voltar à página inicial
            </Link>

            <Waves />
        </NotFoundWrapper>
    )
}
