const validarEmail = (email: string) => {
    return email?.includes('@') && email?.includes('.');
}

const validarSenha = (senha: string) => {
    return senha.length >= 6;
}


export { validarEmail, validarSenha }