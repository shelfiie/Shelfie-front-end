import {Rotas} from "./routes/index.jsx";
import {AuthProvider} from "./context/auth.jsx";

export default function App() {
    return (
        <AuthProvider>
            <Rotas/>
        </AuthProvider>
    );
}
