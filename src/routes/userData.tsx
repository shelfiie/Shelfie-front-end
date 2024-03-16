import { useUserData } from "../hooks/useUserData";

export function UserData() {
    const { data: axiosResponse, isLoading, isError } = useUserData();

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (isError) {
        return <div>Ocorreu um erro ao carregar os dados do usuário.</div>;
    }

    // Verifica se axiosResponse é definido antes de acessar axiosResponse.data
    if (!axiosResponse) {
        return <div>Dados de usuário não encontrados.</div>;
    }

    const userData = axiosResponse.data; // Acessa os dados da resposta Axios

    return (
        <div>
            {userData.map(user => (
                <div>
                    <h2>Id: {user.id}</h2>
                    <h3>Name: {user.name}</h3>
                    <h3>UserName: {user.username}</h3>
                    <h3>Password: {user.password}</h3>
                    <h3>Role: {user.role}</h3>
                </div>
            ))}
        </div>
    );
}
