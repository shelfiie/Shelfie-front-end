import {Rotas} from "./routes/index.jsx";
import {AuthProvider} from "./context/auth.tsx";

export default function App() {
    return (
        <AuthProvider>
            <Rotas/>
        </AuthProvider>
    );
}
