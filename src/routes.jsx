import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './utils/useAuth';

import Home from './pages/Home/home';
import Login from "./pages/Auth/login";
import Signup from './pages/Auth/signup';
import Catalogo from './pages/Catalogo/catalogo';
import ProductView from "./pages/ProductView/productview";

import Header from "./components/header";

// Componente para proteger rotas e gerenciar o loading do F5
function ProtectedHandler({ children }) {
    const { isAuthenticated, loading } = useAuth();

    // Enquanto o checkSession() no useAuth não termina, mostramos uma tela de espera
    // Isso evita que o sistema te deslogue por "usuário ser null" no primeiro segundo
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Carregando sessão...</p> 
            </div>
        );
    }

    return children;
}

function RotasApp() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Rotas Públicas de Auth - Sem Header */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Rotas que usam o Layout (Header + Conteúdo) */}
                    <Route element={
                        <ProtectedHandler>
                            <Layout />
                        </ProtectedHandler>
                    }>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalogo/:slug" element={<Catalogo />} />
                        <Route path="/productview" element={<ProductView />} />
                        
                        {/* Exemplo de Rota que SÓ Admin acessa (se precisar) */}
                        {/* <Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/" />} /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

function Layout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default RotasApp;